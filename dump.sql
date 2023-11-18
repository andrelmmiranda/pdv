CREATE database pdv; 

create table IF NOT EXISTS usuarios (
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
 );


create table IF NOT EXISTS categorias (
  id serial primary key,
  descricao text not null
 );



INSERT into categorias
(descricao)
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');


-- Criação da tabela 'produtos'
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id) ,
    produto_imagem text
);

-- Criação da tabela 'clientes'
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf VARCHAR(30) NOT NULL UNIQUE,
    cep VARCHAR(30),
    rua TEXT,
    numero VARCHAR(10),
    bairro TEXT,
    cidade TEXT,
    estado TEXT
);

create table pedidos (
id serial primary key,
cliente_id integer references clientes(id),
observacao text,
valor_total integer
);

create table pedido_produtos (
id serial primary key,
pedido_id integer references pedidos(id),
produto_id integer references produtos(id),
quantidade_produto integer not null,
valor_produto integer
);

