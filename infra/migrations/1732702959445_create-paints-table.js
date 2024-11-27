/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("paints", {
    id: { type: "serial", primaryKey: true },
    total_area: { type: "varchar(100)", notNull: true },
    liters_required: { type: "varchar(100)", notNull: true },
    cans: { type: "jsonb", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

exports.down = pgm => { pgm.dropTable("paints"); };
