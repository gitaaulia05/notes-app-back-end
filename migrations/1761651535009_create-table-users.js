
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('users' , {
        id: {
            type:'Varchar(50)',
            primaryKey: true,
        },
        username: {
            type:'Varchar(50)',
            notNull: true,
        },
        password: {
            type:'Varchar(500)',
            notNull: true,
        },
        fullname: {
            type:'Varchar(50)',
            notNull: true,
        },
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users');
};
