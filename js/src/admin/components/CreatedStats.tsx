import Component, { ComponentAttrs } from 'flarum/common/Component';
import Mithril from 'mithril';
import app from 'flarum/admin/app'
import {BaseStat} from "./types";

export interface CreatedStatsAttrs {
  actualStats: BaseStat[]
  deleteStat: (id: string | number) => void
  refetch: () => void
}

export default class CreatedStats extends Component<CreatedStatsAttrs> {
  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);
  }

  view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children {
    return (
      <div className="created-stats-wrapper">
        <h3>{app.translator.trans('justoverclock-stats.admin.actualStatsTitle')}</h3>
        <div className="created-stats-container">
          {this.attrs.actualStats &&
            this.attrs.actualStats.map((stat) => (
              <div className="stat-container">
                <img src={stat.attributes.img} alt={stat.attributes.name} />
                <div className="stat-content">
                  <div>
                    <strong>{stat.attributes.name}</strong>
                  </div>
                  <div className="stat-actions">
                    <button
                      onclick={() => {
                        this.attrs.deleteStat(stat.attributes.id)
                        window.location.reload()
                      }}
                      className='Button Button--danger'
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
