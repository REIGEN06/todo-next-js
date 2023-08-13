import {
	Table,
	Column,
	Model,
	AllowNull,
	CreatedAt,
	UpdatedAt,
	PrimaryKey,
} from 'sequelize-typescript';

@Table({
	modelName: 'Todo',
})
export default class Todo extends Model {
	@Column
	title: string;

	@Column
	done: boolean;

	@CreatedAt
	createdAt: Date;

	@UpdatedAt
	updatedAt: Date;
}
