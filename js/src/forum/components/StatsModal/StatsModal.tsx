// @ts-nocheck
import Modal from "flarum/common/components/Modal";
import Mithril from "mithril";
import UserStats from "../UserStats";

export default class StatsModal extends Modal {
  className(): string {
    return 'stats-modal';
  }

  title(): Mithril.Children {
    return ``;
  }

  closeModal() {
    this.hide()
  }

  content(): Mithril.Children {
    return (
      <div className="edit-stat-modal-container">
        <UserStats user={this.attrs.user} />
        <button
          onclick={() => this.closeModal()}
          class='Button Button--primary'>
          Close
        </button>
      </div>
    );
  }
}
