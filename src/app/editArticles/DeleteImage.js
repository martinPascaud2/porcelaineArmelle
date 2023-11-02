"use client";

export async function DeleteImage({ deleteImage, id }) {
  return <button onClick={() => deleteImage(id)}>Supprimer l{"'"}image</button>;
}
