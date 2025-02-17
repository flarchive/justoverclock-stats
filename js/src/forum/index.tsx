// @ts-nocheck
import app from 'flarum/forum/app';
import UserCard from 'flarum/forum/components/UserCard';
import { extend } from 'flarum/common/extend';
import UserStats from "./components/UserStats";
import UserStatsPopover from "./components/UserStatsPopover";

app.initializers.add('justoverclock/stats', () => {
  /*extend(UserCard.prototype, 'view', function (vdom){
    if (vdom.children && vdom.children.splice) {
      vdom.children.splice(1,0, <UserStats user={this.attrs.user} />)
    }
  })*/
  extend(UserCard.prototype, 'view', function (vnode) {
    const avatarNode = vnode.children[0].children[0].children[1].children
    console.log(avatarNode)
    avatarNode.push(
      <UserStatsPopover user={this.attrs.user} />
    );
  });
});
