import React from 'react';

const activityDesc = [
  {
    Q: '参加活动的房源将在哪里展示呢？',
    A: '在公寓首屏的Banner、公寓首屏大促活动页、搜索公寓列表页的优惠标签、店铺页、详情页都会有曝光。',
  },
  {
    Q: '活动上线后商家还可以修改活动信息或追加优惠房源吗？',
    A: '当优惠券活动开始前的5分钟内及以后，活动被锁定上架到C端，您只能追加优惠券的张数；在活动待开始的5分钟前及更早，活动还未被锁定时，您可以添加优惠房源或修改优惠券的张数。',
  },
  {
    Q: '如果参与活动的用户在年租租期内提前退租怎么办？',
    A: '如果参与活动的用户在年租租期内提前退租，需退回首月优惠金额给商家。具体退回方式参照用户与商家书面协议约定，如无约定，需商家与参与活动用户协商。',
  },
  {
    Q: '如果店家误操作发了活动，客户领了券，然后去去门店办理，门店不承认活动且不给优惠怎么办 ？',
    A: '我们默认商家在确认报名时，已知晓活动运营规则，并需要自行承担优惠成本。当发生这种情况用户可以在C端发起投诉，核实情况属实后，将会对商家房源进行下架处理，并影响商家信用。',
  },
  {
    Q: '中途想退出活动怎么办？',
    A: '您可在营销中心->优惠券管理菜单页点击终止活动，一旦终止活动，商家优惠信息将立即下架（下架位置包括：公寓首屏的Banner、公寓首屏大促活动页、搜索公寓列表页的优惠标签、店铺页、详情页）。',
  },
  {
    Q: '哪些角色有活动的配置权限呢？',
    A: '默认仅巧房公寓版系统超级管理员开放招商活动提报页面的入口，可在权限模块配置给店长或相关负责人员。',
  },
];

const IndexPage: React.FC = () => {
  return (
    <div className="activity-desc">
      <h1>规则22222222</h1>
      {
        activityDesc.map((item, index) => (
          <div className="desc-item" key={index}>
            <h4>{`${index + 1}.Q：${item.Q}`}</h4>
            <p>{`A：${item.A}`}</p>
          </div>
        ))
      }
    </div>
  );
};

export default IndexPage;
