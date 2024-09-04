from fastapi import FastAPI, File, UploadFile, HTTPException, Query,Form
from fastapi.responses import StreamingResponse
from fastapi.encoders import jsonable_encoder
from typing import Optional
from config import get_db_connection
import io
import uvicorn


app = FastAPI()

@app.get("/show/{image_id}")
def read_image(image_id: int):
  connection = get_db_connection()
  cursor = connection.cursor()
  try:
    cursor.execute("SELECT imagem FROM produtos WHERE id = %s", (image_id,))
    image_data = cursor.fetchone()
    if image_data is None:
        raise HTTPException(status_code=404, detail="Image not found")

    # Retorna a imagem como resposta
    return StreamingResponse(io.BytesIO(image_data[0]), media_type="image/jpeg")
  finally:
    cursor.close()
    connection.close()
    
    
@app.post("/produtos/")
async def create_produto(
    file: UploadFile = File(...),
    titulo: str = Form(...),
    descricao: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    preco: float = Form(...)
):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        # Lê a imagem enviada
        imagem = await file.read()

        # Processa as tags, assumindo que são enviadas como uma string separada por vírgulas
        tags_list = tags.split(",") if tags else []

        # Insere o produto no banco de dados
        cursor.execute("""
            INSERT INTO produtos (imagem, titulo, descricao, tags, preco)
            VALUES (%s, %s, %s, %s, %s) RETURNING id
        """, (imagem, titulo, descricao, tags_list, preco))
        
        connection.commit()
        produto_id = cursor.fetchone()[0]
        
        return {"id": produto_id, "titulo": titulo}
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail="Error creating product")
    finally:
        cursor.close()
        connection.close()
    
@app.get("/produtos/")
def get_produtos(start: int = Query(0, ge=0), end: int = Query(10, ge=1)):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        # Seleciona os produtos dentro do intervalo especificado
        cursor.execute("""
            SELECT id, titulo, descricao, tags, preco FROM produtos
            ORDER BY id
            LIMIT %s OFFSET %s
        """, (end - start, start))
        
        produtos = cursor.fetchall()
        
        if not produtos:
            raise HTTPException(status_code=404, detail="No products found in the given range")
        
        # Prepara o retorno como uma lista de objetos JSON
        results = []
        for produto in produtos:
            produto_id, titulo, descricao, tags, preco = produto
            results.append({
                "id": produto_id,
                "titulo": titulo,
                "descricao": descricao,
                "tags": tags,
                "preco": preco
            })
        
        return jsonable_encoder(results)
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
  uvicorn.run(app)