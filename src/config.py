from dotenv import load_dotenv
import os 
import psycopg2

load_dotenv()

# Dados de Conexao
DB_HOST     = os.getenv('DB_HOST')
DB_DATABASE = os.getenv('DB_DATABASE')
DB_USER     = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

# Conectando ao banco de dados
def get_db_connection():
  connection = psycopg2.connect(
      host=DB_HOST,
      database=DB_DATABASE,
      user=DB_USER,
      password=DB_PASSWORD
  )
  return connection
