const CreateTableSQL = `
    DROP TABLE IF EXISTS admin;
    DROP TABLE IF EXISTS seller;
    DROP TABLE IF EXISTS users;

    -- Entity
    CREATE TABLE users
    (
        userid INT NOT NULL,
        name VARCHAR(20),
        phoneNumber VARCHAR(20),
        PRIMARY KEY(userid)
    );

    CREATE TABLE admin
    (
        userid INT NOT NULL,
        PRIMARY KEY(userid),
        FOREIGN KEY(userid) REFERENCES Users(userid) 
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );

    CREATE TABLE seller
    (
        userid INT NOT NULL,
        PRIMARY KEY(userid),
        FOREIGN KEY(userid) REFERENCES Users(userid) 
            ON DELETE CASCADE
            ON UPDATE CASCADE 
    );
`;

export default CreateTableSQL;
