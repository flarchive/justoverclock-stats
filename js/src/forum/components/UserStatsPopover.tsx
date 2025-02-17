// @ts-nocheck
import Component, {ComponentAttrs} from "flarum/common/Component";
import Mithril from "mithril";
import app from 'flarum/forum/app'
import StatsModal from "./StatsModal/StatsModal";

export default class UserStatsPopover extends Component {
  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);
  }


  openModal() {
    app.modal.show(StatsModal, { user: this.attrs.user })
  }

  view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children {
    return (
      <div className='stats-btn-popover'>
        <div className='stats-svg' onclick={() => this.openModal()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="statistic">
            <path fill="#4D698E" d="M29,10V22a5.021,5.021,0,0,1-.3,1.7,5.084,5.084,0,0,1-1.99,2.51A5,5,0,0,1,24,27H8a5,5,0,0,1-5-5V10a5,5,0,0,1,.79-2.71A5.084,5.084,0,0,1,6.3,5.3,5.021,5.021,0,0,1,8,5H24A5,5,0,0,1,29,10Z"></path>
            <path fill="#4D698E" d="M29,10V22a5.021,5.021,0,0,1-.3,1.7A4.788,4.788,0,0,1,27,24H11a5,5,0,0,1-5-5V7a4.788,4.788,0,0,1,.3-1.7A5.021,5.021,0,0,1,8,5H24A5,5,0,0,1,29,10Z"></path>
            <path fill="#4D698E" d="M24,27H8a5.006,5.006,0,0,1-5-5V10A5.006,5.006,0,0,1,8,5H24a5.006,5.006,0,0,1,5,5V22A5.006,5.006,0,0,1,24,27ZM8,7a3,3,0,0,0-3,3V22a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z"></path>
            <path fill="#fff" d="M16 22.5A1.5 1.5 0 0114.5 21V11a1.5 1.5 0 013 0V21A1.5 1.5 0 0116 22.5zM10 22.5A1.5 1.5 0 018.5 21V15a1.5 1.5 0 013 0v6A1.5 1.5 0 0110 22.5zM22 22.5A1.5 1.5 0 0120.5 21V13a1.5 1.5 0 013 0v8A1.5 1.5 0 0122 22.5z"></path>
          </svg>
        </div>
      </div>
    );
  }
}
