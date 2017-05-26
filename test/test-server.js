'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Blog Post', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

  it('should list blog post on GET', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['id', 'title', 'content', 'author'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });

  it('should add a blog post on POST', function() {
    const newItem = {title: 'Why Windows Sucks', content: 'We had a fun morning troubleshooting Heroku installation on a PC.', author: 'Chris'};
    return chai.request(app)
      .post('/blog-posts')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'title', 'content', 'author');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  it('should updated blog post on PUT', function() {
    const updateData = {
      title: 'I cannot with Windows',
      content: 'I feel like I worked all morning trying to troubleshoot a widespread problem that could not be solved with all my expertise. Sigh.',
      author: 'Casey'
    };
    return chai.request(app)
      .get('/blog-post')
      .then(function(res) {
        updateData.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-post/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.deep.equal(updateData);
      });
  });

  it('should delete blog post on DELETE', function() {
    return chai.request(app)
      .get('/blog-post')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-post/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });

});