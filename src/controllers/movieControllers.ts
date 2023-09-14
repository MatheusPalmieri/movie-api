import { Request, Response } from "express";

// Model
import { MovieModel } from "../models/Movie";

// Logger
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    res.status(201).json(movie);
  } catch (e: any) {
    Logger.error("Erro ao criar filme:", e);
  }
}

export async function getMovie(req: Request, res: Response) {
  try {
    const id = req.params.id.toString();
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    return res.status(200).json(movie);
  } catch (e: any) {
    Logger.error("Erro ao buscar filmes:", e);

    return res.status(500).json({ message: "Erro ao buscar filmes." });
  }
}

export async function getMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find();

    return res.status(200).json(movies);
  } catch (e: any) {
    Logger.error("Erro ao buscar filmes:", e);

    return res.status(500).json({ message: "Erro ao buscar filmes." });
  }
}

export async function removeMovie(req: Request, res: Response) {
  try {
    const id = req.params.id.toString();
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    await movie.deleteOne();

    return res.status(200).json({ message: "Filme removido com sucesso." });
  } catch (e) {
    Logger.error("Erro ao remover filme:", e);

    return res.status(500).json({ message: "Erro ao remover filme." });
  }
}

export async function updateMovie(req: Request, res: Response) {
  try {
    const id = req.params.id.toString();
    const body = req.body;

    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    await MovieModel.updateOne({ _id: id }, body);
    return res.status(200).json(body);
  } catch (e) {
    Logger.error("Erro ao atualizar filme:", e);

    return res.status(500).json({ message: "Erro ao atualizar filme." });
  }
}
