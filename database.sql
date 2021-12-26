CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL
);

CREATE TABLE lists(
    list_id SERIAL PRIMARY KEY,
    list_name varchar(255) NOT NULL,
    user_id uuid REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE desires(
    desire_id SERIAL PRIMARY KEY,
    desire_description varchar(255) NOT NULL,
    desire_selected_by uuid REFERENCES users (user_id)
);

CREATE TABLE list_desire(
    list_id INTEGER REFERENCES lists (list_id) ON DELETE CASCADE,
    desire_id INTEGER REFERENCES desires (desire_id) ON DELETE CASCADE
);
