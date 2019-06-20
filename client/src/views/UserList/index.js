import React, { useState, useEffect, useRef } from "react";

import {
  Grid,
  Container,
  CircularProgress,
  Button,
  Avatar,
  IconButton,
  Icon
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import DialogForm from "views/UserList/DialogForm";
import swal from "sweetalert";

import * as userServices from "services/user.services";

function useData() {
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function refetch() {
    setKey(key => key + 1);
  }

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      const users = await userServices.getAll();
      if (mounted) {
        setData(users);
        setLoading(false);
      }
    }
    fetchUsers();

    return () => (mounted = false);
  }, [key]);

  return [data, loading, refetch];
}

export default function UserList() {
  const [users, loading, refetch] = useData();
  const [isShowDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const savedUser = useRef([]);

  useEffect(() => {
    savedUser.current = users;
  });

  function getTableOptions() {
    return {
      filterType: "checkbox",
      download: false,
      print: false,
      filter: false,
      pagination: false,
      sort: false,
      search: false,
      serverSide: true,
      onRowsDelete: async rowsDeleted => {
        const deleteIDs = rowsDeleted.data.map(
          item => savedUser.current[item.dataIndex].user_id
        );

        const willDelete = await swal({
          title: "Are you sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true
        });

        if (willDelete) {
          try {
            await userServices.deleteUser({ deleteIDs });
            swal({ title: "DELETE SUCCESS", icon: "success" });
          } catch (error) {
            swal({ title: "DELETE FAIL", icon: "error" });
          }
          refetch();
        }
      }
    };
  }

  function getColumns() {
    return [
      { label: "USER NAME", name: "username" },
      { label: "FULL NAME", name: "fullname" },
      { label: "ROLE", name: "role" },
      {
        label: "AVATAR",
        name: "avatar_url",
        options: {
          customBodyRender: value => (
            <Avatar src={value} style={{ height: 60, width: 60 }} />
          )
        }
      },
      {
        label: "EDIT",
        name: "user_id",
        options: {
          customBodyRender: (value, tableMeta) => (
            <IconButton onClick={() => onEdit(value, tableMeta)}>
              <Icon>edit</Icon>
            </IconButton>
          )
        }
      }
    ];
  }

  function onEdit(value, tableMeta) {
    const index = tableMeta.rowIndex;
    setEditingUser({ ...savedUser.current[index] });
    setShowDialog(true);
  }

  function onAdd() {
    setEditingUser(null);
    setShowDialog(true);
  }

  return (
    <Container maxWidth="lg" className="container pb-20">
      <Grid container>
        <Grid item xs={12} className="w-full text-right p-8">
          <Button
            variant="outlined"
            color="primary"
            onClick={onAdd}
            children="ADD"
          />
        </Grid>
        <Grid item xs={12}>
          {loading && (
            <div className="w-full text-center p-6">
              <CircularProgress />
            </div>
          )}

          <MUIDataTable
            title="User List"
            data={users}
            columns={getColumns()}
            options={getTableOptions()}
          />
        </Grid>
      </Grid>
      <DialogForm
        open={isShowDialog}
        refetch={refetch}
        user={editingUser}
        onClose={() => setShowDialog(false)}
      />
    </Container>
  );
}
