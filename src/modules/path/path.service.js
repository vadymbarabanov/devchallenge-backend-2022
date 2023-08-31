export default class PathService {
  pathRepo;
  constructor(pathRepo) {
    this.pathRepo = pathRepo;
  }

  getPath(body) {
    this.pathRepo.getPath(body);
  }
}
