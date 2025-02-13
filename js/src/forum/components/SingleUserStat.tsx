import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import Tooltip from 'flarum/common/components/Tooltip';

export interface SingleUserStatAttrs {
  name: string;
  img: string;
  alt: string;
  value: string | number;
  onclick?: () => void;
}

export default class SingleUserStat extends Component<SingleUserStatAttrs> {
  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);
  }

  view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children {
    return (
      <div
        className="stat"
        onclick={() => {
          this.attrs.onclick ? this.attrs.onclick() : null;
        }}
      >
        <div className="stat-value">
          <Tooltip text={this.attrs.name}>
            <img src={this.attrs.img} alt={this.attrs.alt} />
          </Tooltip>
          <p className='stat-desc'>{this.attrs.name}</p>
          <p class="statvalue">{this.attrs.value}</p>
        </div>
      </div>
    );
  }
}
