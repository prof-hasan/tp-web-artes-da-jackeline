CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    imagem BYTEA NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    tags TEXT[],
    preco NUMERIC(10, 2) NOT NULL
)