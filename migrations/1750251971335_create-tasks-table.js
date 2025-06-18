/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
     pgm.createTable('tasks', {
    id: 'uuid DEFAULT gen_random_uuid() PRIMARY KEY',
    project_id: {
      type: 'uuid',
      notNull: true,
      references: 'projects(id)',
      onDelete: 'CASCADE',
    },
    title: { type: 'text', notNull: true },
    description: { type: 'text' },
    status: {
      type: 'text',
      notNull: true,
      default: 'to-do',
      check: "status IN ('to-do', 'in-progress', 'done')"
    },
    priority: {
      type: 'text',
      notNull: true,
      default: 'medium',
      check: "priority IN ('low', 'medium', 'high')"
    },
    deadline: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('tasks');
};
