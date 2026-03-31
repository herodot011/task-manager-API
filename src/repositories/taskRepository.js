    const pool = require('../config/db');
    const AppError = require('../utils/AppError');

    exports.findAll = async ({ status, page = 1, limit = 10 }) => {
        const offset = (page - 1) *  limit;
        const values = [];
        let whereClause = '';

        if(status) {
            values.push(status);
            whereClause = `WHERE status = $${values.length}`
        }

        const countResult = await pool.query(
            `SELECT COUNT(*) FROM tasks ${whereClause}`,
            values
        );

        const total = parseInt(countResult.rows[0].count)

        values.push(limit);
        values.push(offset);

        const result = await pool.query(
        `SELECT * FROM tasks ${whereClause}
        ORDER BY created_at DESC
        LIMIT $${values.length - 1} OFFSET $${values.length}`,
        values
        );
        return { rows: result.rows, total };
    }

    exports.getTasksWithUsers = async () => {
        const result =  await pool.query(
                `SELECT tasks.id, tasks.title, tasks.status, users.name AS user_name
                FROM tasks
                JOIN users
                ON tasks.user_id = users.id
                `
            );
        return result.rows;
    }

    exports.findById = async (id) => {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        )
        return result.rows[0];
    }

    exports.getTasksByUserId = async(userId) => {
        const result = await pool.query(
            `SELECT * FROM tasks
            WHERE user_id = $1`,
            [userId]
        );
        return result.rows
    }


    exports.create = async (data) => {
        const { title, status, user_id } = data;
        const result = await pool.query(
            `INSERT INTO tasks (title, status, user_id) 
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                title || 'untitled',
                status || 'pending',
                user_id || null
            ]
        );

        return result.rows[0];

        // const task = {
        //     id: uuidv4(),
        //     title: data.title || 'untitled',
        //     status: data.status || 'pending',
        //     createdAt: new Date().toISOString()
        // }
        // tasks.push(task);
        // return task;
    }

    exports.delete = async (id) => {
        exports.delete = async (id) => {
            await pool.query(
                'DELETE FROM tasks WHERE id = $1',
                [id]
            );
        }
    }

    exports.update = async (id, updatedTask) => {
        const ALLOWED_UPDATE_FIELDS = ['title', 'status'];
        const fields = [];
        const values = [];
        let index = 1;

        for (const key of ALLOWED_UPDATE_FIELDS) {
            if (updatedTask[key] !== undefined) {
                fields.push(`${key} = $${index}`);
                values.push(updatedTask[key]);
                index++;
            }
        }

        if (fields.length === 0) {
            throw new AppError('No valid fields to update', 400);
        }

        fields.push(`updated_at = NOW()`);
        values.push(id);
        const query = `
            UPDATE tasks
            SET ${fields.join(', ')}
            WHERE id = $${index}
            RETURNING *
        `;

        const result = await pool.query(query, values);
        return result.rows[0];
    }

        // const index = tasks.findIndex(t => t.id === id);
        // if(index === -1) {
        //     return null
        // }
        // tasks[index] = {
        //     ...tasks[index],
        //     ...updatedTask,
        //     updatedAt: new Date().toISOString()
        // };
        // return tasks[index];