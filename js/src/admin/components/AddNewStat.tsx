import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import app from 'flarum/admin/app';
import Stream from 'flarum/common/utils/Stream';

export interface AddNewStatAttrs {
  createStat: (name: string, img: string) => void;
  refetch: () => void
}

export default class AddNewStat extends Component<AddNewStatAttrs> {
  stat_name = Stream('');
  stat_img = Stream('');

  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);
  }

  view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children {
    return (
      <div className="add-stats-container">
        <input
          oninput={(e: { target: { value: string } }) => this.stat_name(e.target.value)}
          name="stat_name"
          value={this.stat_name()}
          placeholder={app.translator.trans('justoverclock-stats.admin.baseStatInputName')}
          className="FormControl"
          type="text"
        />
        <input
          oninput={(e: { target: { value: string } }) => this.stat_img(e.target.value)}
          name="stat_img"
          value={this.stat_img()}
          placeholder={app.translator.trans('justoverclock-stats.admin.baseStatInputImg')}
          className="FormControl"
          type="url"
        />
        <button
          disabled={this.stat_name() === '' && this.stat_img() === ''}
          onclick={() => {
            this.attrs.createStat(this.stat_name(), this.stat_img())
            window.location.reload();
          }}
          class="Button Button--primary">
          {app.translator.trans('justoverclock-stats.admin.addStatBtn')}
        </button>
      </div>
    );
  }


}
