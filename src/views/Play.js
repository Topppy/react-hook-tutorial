import React from 'react';
import SwitchLight from '../components/SwitchLight';

export default function Play() {
  return (
    <div>
      <h1>玩一下 Hooks</h1>
      <SwitchLight></SwitchLight>
      <h3>hooks为了解决什么问题？</h3>
      <p>逻辑复用</p>
      <h3>class会完全被替代吗？</h3>
      <p>也许，但是react并不打算删除掉class。</p>
    </div>
  );
}