--sql query used to create table for contact me form
create table todo (
    todo_id INTEGER auto_increment,
    todo_name text not null,
    todo_description text not null,
    is_resolved BIT(1) not null,
    todo_date DATE not null,
    primary key(todo_id)
);

INSERT INTO todo (todo_name, todo_description, is_resolved, todo_date) VALUES (?, ?, ?, ?)

