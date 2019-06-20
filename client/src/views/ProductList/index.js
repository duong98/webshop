import React, { useState, useEffect, useRef } from "react";

import {
  Grid,
  Container,
  CircularProgress,
  Button,
  IconButton,
  Icon
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import DialogForm from "views/ProductList/DialogForm";
import swal from "sweetalert";

import * as productServices from "services/product.services";

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
      const products = await productServices.getAll();
      if (mounted) {
        setData(products);
        setLoading(false);
      }
    }
    fetchUsers();

    return () => (mounted = false);
  }, [key]);

  return [data, loading, refetch];
}

export default function UserList() {
  const [products, loading, refetch] = useData();
  const [isShowDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const savedProducts = useRef([]);

  useEffect(() => {
    savedProducts.current = products;
  }, [products]);

  function getTableOptions() {
    return {
      filterType: "checkbox",
      download: false,
      print: false,
      pagination: false,
      serverSide: true,
      search: false,
      sort: false,
      filter: false,
      onRowsDelete
    };
  }

  function getColumns() {
    return [
      { label: "TITLE", name: "title" },
      {
        label: "CATEGORIES",
        name: "categoryname"
      },
      { label: "PRICE ($)", name: "price" },
      { label: "AVAILIABLE", name: "available" },
      { label: "SALES", name: "sales" },
      {
        label: "IMAGE",
        name: "imageurl",
        options: {
          customBodyRender: value => (
            <img src={value} style={{ height: 80, width: 80 }} alt="" />
          )
        }
      },
      {
        label: "EDIT",
        options: {
          customBodyRender: (value, tableMeta) => (
            <IconButton onClick={() => onEdit(tableMeta)}>
              <Icon>edit</Icon>
            </IconButton>
          )
        }
      }
    ];
  }

  function onAdd() {
    setEditingProduct(null);
    setShowDialog(true);
  }

  function onEdit(tableMeta) {
    const index = tableMeta.rowIndex;
    setEditingProduct({ ...savedProducts.current[index] });
    setShowDialog(true);
  }

  async function onRowsDelete(rowsDeleted) {
    const deleteIDs = rowsDeleted.data.map(
      item => savedProducts.current[item.dataIndex].product_id
    );

    const willDelete = await swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    });

    if (willDelete) {
      try {
        await productServices.deleteProduct({ deleteIDs });
        swal({ title: "DELETE SUCCESS", icon: "success" });
      } catch (error) {
        swal({ title: "DELETE FAIL", icon: "error" });
      }
      refetch();
    }
  }

  return (
    <Container maxWidth="lg">
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
            title="Product List"
            data={products}
            columns={getColumns()}
            options={getTableOptions()}
          />
        </Grid>
      </Grid>
      <DialogForm
        open={isShowDialog}
        onClose={() => setShowDialog(false)}
        product={editingProduct}
        refetch={refetch}
      />
    </Container>
  );
}
