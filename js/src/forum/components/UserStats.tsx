// @ts-nocheck
import Component, {ComponentAttrs} from "flarum/common/Component";
import Mithril from "mithril";
import app from 'flarum/forum/app'
import LoadingIndicator from 'flarum/common/components/LoadingIndicator'
import User from "flarum/common/models/User";
import {ApiResponse, BaseStat, UserStat} from "./types";
import EditModal from "./EditModal/EditModal";
import SingleUserStat from "./SingleUserStat";

interface UserStatsAttrs {
  user: User
}

export default class UserStats extends Component<UserStatsAttrs> {
  public userStat: ApiResponse | null = null;

  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);
    this.userStat = null;
    this.getUserStat();

  }

  view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children {
    if (!this.userStat) {
      return <div></div>;
    }
    const { data } = this.attrs.user
    const moneyName = app.forum.attribute('antoinefr-money.moneyname') || '[money]';
    const storiesName = app.translator.trans('justoverclock-stats.forum.storyCount');
    const userMoney = data.attributes.money ?? 0
    const userStoriesCount = data.attributes.storyCount ?? 0
    const moneyImg =  `${app.forum.attribute('baseUrl')}/assets/extensions/justoverclock-stats/money1.png`
    const storiesImg =  `${app.forum.attribute('baseUrl')}/assets/extensions/justoverclock-stats/storiespng.png`
    const canEditStats: boolean = data.attributes?.canEditStats

    return (
      <div className='show-stats-wrapper'>
        <div className='user-stats-fe show-stats-container'>
          <SingleUserStat
            name={moneyName}
            img={app.forum.attribute('justoverclock-stats.moneyImg') || moneyImg}
            alt={moneyName}
            value={userMoney}
          />
          <SingleUserStat
            name={storiesName}
            img={app.forum.attribute('justoverclock-stats.storiesImg') || storiesImg}
            alt={storiesName}
            value={userStoriesCount}
          />
          {this.userStat.data && this.userStat.data.map((stat: UserStat) => {
            const baseStat: BaseStat | null | undefined = this.userStat && this.userStat.included.find(
              baseStat => baseStat.id.toString() === stat.attributes.baseStatId.toString()
            );
            const imgPath = baseStat ? baseStat.attributes.img : "";


            return (
              <SingleUserStat
                name={baseStat?.attributes.name}
                img={imgPath}
                alt={baseStat?.attributes.name}
                value={stat.attributes.value}
                onclick={() => {
                  canEditStats ? this.openEditModal(stat, baseStat, this.attrs.user) : null;
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  openEditModal(stat: UserStat, baseStat: any, user: User) {
    app.modal.show(EditModal, {
      stat,
      baseStat,
      user,
      editUserStat: this.editUserStat.bind(this)
    })
  }

  editUserStat(id: string | number, newValue: string | number) {
    app.request({
      method: 'PATCH',
      url: `${app.forum.attribute('apiUrl')}/user-stats/${id}`,
      body: {
        data: {
          attributes: {
            value: Number(newValue)
          }
        }
      }
    }).then(() => {
      app.alerts.show({type: 'success'}, app.translator.trans('justoverclock-stats.forum.successStatEdited'))
    })
  }

  getUserStat() {
    app.request({
      method: 'GET',
      url: `${app.forum.attribute('apiUrl')}/user-stats/${this.attrs.user.data.id}`,
    }).then(res => {
      this.userStat = res as ApiResponse;
      m.redraw()
    })
  }
}
