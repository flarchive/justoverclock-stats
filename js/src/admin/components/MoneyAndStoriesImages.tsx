import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import app from 'flarum/admin/app'
import Stream from "flarum/common/utils/Stream";
import  {ExtensionPageAttrs} from "flarum/admin/components/ExtensionPage";

interface MoneyAndStoriesImagesAttrs {
  moneySetting: Stream<string>;
  storiesSetting: Stream<string>;
  onSave: () => void;
}

export default class MoneyAndStoriesImages extends Component<MoneyAndStoriesImagesAttrs> {
  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);
  }

  view(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): JSX.Element | null {
    return (
      <div className="img-conf-container">
        <h3>Money and Stories images:</h3>
        <input
          name="money_img"
          bidi={this.attrs.moneySetting}
          placeholder={app.translator.trans('justoverclock-stats.admin.moneyImgInputName')}
          className="FormControl"
          type="text"
        />

        <input
          name="stories_img"
          bidi={this.attrs.storiesSetting}
          placeholder={app.translator.trans('justoverclock-stats.admin.storiesImgInputName')}
          className="FormControl"
          type="text"
        />
        <button onclick={this.attrs.onSave} className='Button Button--primary'>
          Save
        </button>
      </div>
    );
  }
}
