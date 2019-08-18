import _                 from 'lodash';
import CachedJsonService from './CachedJsonService';

/**
 * Base class for communicating with jsonplaceholder.typicode.com
 *
 * All the requests are cached given this is a demo app
 *
 * @class PlaceholderService
 * @extends {CachedJsonService}
 */
class PlaceholderService extends CachedJsonService {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  /**
   * Returns all the users
   *
   * @returns {Users[]}
   * @memberof PlaceholderService
   */
  loadUsers() {
    return this.GET('/users');
  }

  /**
   * Returns a single user
   *
   * @param {Number} id
   * @returns {User}
   * @memberof PlaceholderService
   */
  async loadUser(id) {
    const users = await this.loadUsers();
    return _.find(users, ['id', id]);
  }

  /**
   * Returns all the photos
   *
   * @returns {Photo[]}
   * @memberof PlaceholderService
   */
  loadPhotos() {
    return this.GET('/photos');
  }

  /**
   * Returns all the comments
   *
   * @returns {Comment[]}
   * @memberof PlaceholderService
   */
  loadComments() {
    return this.GET('/comments');
  }

  /**
   * Returns all the todos
   *
   * @returns {Todo[]}
   * @memberof PlaceholderService
   */
  loadTodos() {
    return this.GET('/todos');
  }

  /**
   * Returns all the todos
   *
   * @returns {Todo[]}
   * @memberof PlaceholderService
   */
  async loadTodosForUser(userId) {
    const todos = await this.loadTodos();
    return _.filter(todos, ['userId', userId]);
  }

  /**
   * Returns all the posts
   *
   * @returns {Post[]}
   * @memberof PlaceholderService
   */
  async loadPosts() {
    const comments = await this.loadComments();
    const posts    = await this.GET('/posts');

    return _.map(posts, post => ({
      ...post,
      comments: _.filter(comments, ['postId', post.id])
    }));
  }

  /**
   * Returns all the posts of a specific user
   *
   * @param {Number} userId
   * @returns {Post[]}
   * @memberof PlaceholderService
   */
  async loadUserPosts(userId) {
    const posts = await this.loadPosts();
    return _.filter(posts, ['userId', userId]);
  }

  /**
   * Returns all the albums
   *
   * @returns {Album[]}
   * @memberof PlaceholderService
   */
  async loadAlbums() {
    const photos = await this.loadPhotos();
    const albums = await this.GET('/albums');

    return _.map(albums, alb => ({
      ...alb,
      photos: _.filter(photos, ['albumId', alb.id])
    }));
  }

  /**
   * Returns all the albums of a specific user
   *
   * @param {*} userId
   * @returns {Album[]}
   * @memberof PlaceholderService
   */
  async loadUserAlbums(userId) {
    const albums = await this.loadAlbums();
    return _.filter(albums, ['userId', userId]);
  }
}

export default new PlaceholderService();