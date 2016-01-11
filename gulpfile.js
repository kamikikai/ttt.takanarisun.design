'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const csso = require('gulp-csso');
const inject = require('gulp-inject');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('default', () =>
  gulp.src('src/index.html')
    .pipe(inject(gulp.src('src/assets/header.svg'), {
      transform(filepath, file, i, length) {
        return file.contents.toString();
      },
      name: 'logo'
    }))
    .pipe(inject(gulp.src('src/assets/icon-home.svg'), {
      transform(filepath, file, i, length) {
        return file.contents.toString();
      },
      name: 'icon-home'
    }))
    .pipe(inject(gulp.src('src/assets/icon-kamikikai.svg'), {
      transform(filepath, file, i, length) {
        return file.contents.toString();
      },
      name: 'icon-kamikikai'
    }))
    .pipe(inject(gulp.src('src/assets/icon-twitter.svg'), {
      transform(filepath, file, i, length) {
        return file.contents.toString();
      },
      name: 'icon-twitter'
    }))
    .pipe(inject(gulp.src('src/style.less')
      .pipe(less({
        paths: ['node_modules']
      }))
      .pipe(postcss([autoprefixer({browsers: ['> 5%']})]))
      .pipe(csso()), {
        transform(filepath, file, i, length) {
          return `<style>${file.contents.toString()}</style>`;
        },
        name: 'style'
      }))
    .pipe(gulp.dest('build')));
