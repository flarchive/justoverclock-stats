import app from 'flarum/admin/app';
import BaseStatsManager from "./components/BaseStatsManager";

app.initializers.add('justoverclock/stats', () => {
  app.extensionData
    .for('justoverclock-stats')
    .registerPage(BaseStatsManager)
    .registerPermission(
      {
        icon: 'far fa-file-alt',
        label: app.translator.trans('justoverclock-stats.admin.permission.editStat'),
        permission: 'editStat',
        allowGuest: false,
      },
      'moderate'
    )
});
