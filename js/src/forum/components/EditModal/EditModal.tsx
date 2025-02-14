import Modal, {IInternalModalAttrs} from "flarum/common/components/Modal";
import Mithril from "mithril";
import {UserStat} from "../types";
import User from "flarum/common/models/User";
import Stream from "flarum/common/utils/Stream";
import app from 'flarum/forum/app'

interface StatModalAttrs extends IInternalModalAttrs {
  stat: UserStat
  baseStat: any
  user: User
  editUserStat: (id: string | number, newValue: string | number) => void
}

export default class EditModal extends Modal<StatModalAttrs> {
  value = Stream('')
  className(): string {
    return 'stat-modal-edit';
  }

  title(): Mithril.Children {
    return `${this.attrs.baseStat.attributes.name}`;
  }

  content(): Mithril.Children {
    const statName = this.attrs.baseStat.attributes.name
    const username = this.attrs.user.displayName()
    return (
      <div className="edit-stat-modal-container">
        <h3>
          Set "{statName}" for {username}
        </h3>
        <input
          className="FormControl"
          name={statName}
          placeholder={app.translator.trans('justoverclock-stats.forum.editStatInputPlaceholder')}
          type="text"
          oninput={(e: { target: { value: any } }) => this.value(e.target.value)}
        />
        <button
          onclick={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            this.attrs.editUserStat(this.attrs.stat.id, this.value());
            this.hide()
          }}
          className="Button Button--primary"
        >
          {app.translator.trans('justoverclock-stats.forum.save')}
        </button>
      </div>
    );
  }
}
