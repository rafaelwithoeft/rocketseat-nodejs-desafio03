const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const repositories = [];

/**
 * Return all repositories.
 */
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

/**
 * Create new repository.
 */
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

/**
 * Update one repository.
 */
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repository = { ...repositories[repositoryIndex], title, techs, url };
  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

/**
 * Delete one repository.
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

/**
 * Increase one like to specific repository.
 */
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes += 1;

  return response.status(201).json(repositories[repositoryIndex]);
});

module.exports = app;
