import app from 'flarum/common/app';

app.initializers.add('justoverclock/stats', () => {
  console.log('[justoverclock/stats] Hello, forum and admin!');
});
