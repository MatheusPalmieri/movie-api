import { body } from "express-validator";

export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("Título é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("Título deve ter no mínimo 3 caracteres."),
    body("rating")
      .isNumeric()
      .withMessage("Rating deve ser um número.")
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("Rating deve ser um número entre 0 e 10.");
        } else {
            return true;
        }
      }),
    body("description").isString().withMessage("Descrição é obrigatória."),
    body("director").isString().withMessage("Diretor é obrigatório."),
    body("poster").isURL().withMessage("Poster deve ser uma URL válida."),
  ];
};
