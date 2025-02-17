import app from 'flarum/admin/app'
import Mithril from 'mithril';
import ExtensionPage, {ExtensionPageAttrs} from "flarum/admin/components/ExtensionPage";
import AddNewStat from "./AddNewStat";
import CreatedStats from "./CreatedStats";
import {BaseStat, BaseStatsResponse} from "./types";
import MoneyAndStoriesImages from "./MoneyAndStoriesImages";

export default class BaseStatsManager extends ExtensionPage {
  public actualStats: BaseStat[] = [];
  oninit(vnode: Mithril.Vnode<ExtensionPageAttrs, this>) {
    super.oninit(vnode);
    this.actualStats = [];
    this.getStats();
  }

  content(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): JSX.Element {
    return (
      <div class="base-stats-admin-container">
        <AddNewStat
          refetch={this.getStats.bind(this)}
          createStat={this.createStat.bind(this)}
        />
        <CreatedStats
          actualStats={this.actualStats}
          deleteStat={this.deleteStat.bind(this)}
        />
        <MoneyAndStoriesImages
          moneySetting={this.setting('justoverclock-stats.moneyImg')}
          storiesSetting={this.setting('justoverclock-stats.storiesImg')}
          onSave={this.saveSettings.bind(this)}
        />
      </div>
    );
  }

  createStat(name: string, img: string) {
    app.request({
      method: 'POST',
      url: `${app.forum.attribute('apiUrl')}/base-stats/create`,
      body: {
        data: {
          attributes: {
            stat_name: name,
            stat_img: img
          }
        }
      }
    }).then(() => {
      app.alerts.show({ type: 'success' }, app.translator.trans('justoverclock-stats.admin.successStatCreated'))
    }).catch(() => {
      app.alerts.show({ type: 'error' }, app.translator.trans('justoverclock-stats.admin.failStatCreated'))
    })
  }

  deleteStat(id: string) {
    app.request({
      method: 'DELETE',
      url: `${app.forum.attribute('apiUrl')}/base-stats/delete/${id}`,
    }).then(() => {
      app.alerts.show({ type: 'success' }, app.translator.trans('justoverclock-stats.admin.successStatDeleted'))
    }).catch(() => {
      app.alerts.show({ type: 'error' }, app.translator.trans('justoverclock-stats.admin.failStatDeleted'))
    })
  }

  getStats() {
    app.request({
      method: 'GET',
      url: `${app.forum.attribute('apiUrl')}/base-stats`,
    }).then((res: unknown) => {
      const data = res as BaseStatsResponse;
      this.actualStats = data.data
      m.redraw();
    })
  }
}
