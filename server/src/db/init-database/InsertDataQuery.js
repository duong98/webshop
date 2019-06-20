const InsertDateQuery = `
    -- insert users
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (1, 'Leonard Carroll', '809-902-4957');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (2, 'Sybill C. Kane', '797-156-7733');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (3, 'Ryder Stanton', '857-833-6279');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (4, 'Owen Robbins', '102-490-9669');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (5, 'Tyrone D. Harvey', '364-220-7833');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (6, 'Tanek T. Noble', '577-561-5445');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (7, 'Tanek X. Bridges', '817-736-8954');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (8, 'Latifah Q. Erickson', '500-413-5229');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (9, 'Geoffrey Erickson', '311-237-5037');
    INSERT INTO "users"
        (userid,name,phoneNumber)
    VALUES
        (10, 'Galvin Hart', '501-807-7965');

    -- insert admin
    INSERT INTO admin VALUES (1);
    INSERT INTO admin VALUES (2);
    INSERT INTO admin VALUES (3);

    -- insert seller
    INSERT INTO seller VALUES (4);
    INSERT INTO seller VALUES (5);
    INSERT INTO seller VALUES (6);
    INSERT INTO seller VALUES (7);
    INSERT INTO seller VALUES (8);
    INSERT INTO seller VALUES (9);
    INSERT INTO seller VALUES (10);
`;

export default InsertDateQuery;
