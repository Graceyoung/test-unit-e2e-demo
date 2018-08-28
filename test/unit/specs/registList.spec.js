import {shallowMount} from '@vue/test-utils'
import RegistList from '@/views/components/registList.vue';
import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
describe('RegistList.vue', () => {
    const wrapper = shallowMount(RegistList);

    // 用户名校验
    it('用户名的长度小于6时', function () {
        wrapper.setData({registForm: {username: '12'}});
        setTimeout(function () {
          let nameItem = wrapper.findAll('el-form-item').at(0);
          nameItem.find('el-input').trigger('blur');
            expect(nameItem.find('.el-form-item__error').length).toBe(1);
            expect(nameItem.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.username[1].message);
        }, 1000);
    });
    it('用户名长度在6~14时', function () {
        wrapper.setData({registForm: {username: '1234567'}});
        setTimeout(function () {
          let nameItem = wrapper.findAll('.el-form-item').at(0);
          nameItem.find('.el-input').trigger('blur');
            expect(nameItem.is('.el-form-item__error')).toBe(false);
        }, 1000);
    });
    it('用户名长度大于14时', function () {
        wrapper.setData({registForm: {username: '1234567891234567'}});
        setTimeout(function () {
          let nameItem = wrapper.findAll('.el-form-item').at(0);
          nameItem.find('.el-input').trigger('blur');
            expect(nameItem.find('.el-form-item__error').length).toBe(1);
            expect(nameItem.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.username[1].message);
        }, 1000);
    });
    it('用户名为空时', function () {
        wrapper.setData({registForm: {username: ''}});
        setTimeout(function () {
          let nameItem = wrapper.findAll('.el-form-item').at(0);
          nameItem.find('.el-input').trigger('blur');
            expect(nameItem.find('.el-form-item__error').length).toBe(1);
            expect(nameItem.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.username[0].message);
        }, 1000);
    });

    // 密码校验
  it('密码的长度小于6时', function () {
      wrapper.setData({registForm: {pass: '12'}});

      setTimeout(function () {
        let item = wrapper.findAll('.el-form-item').at(1);
        item.find('.el-input').trigger('blur');
          expect(item.find('.el-form-item__error').length).toBe(1);
          expect(item.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass[1].message);
      }, 1000);
  });
  it('密码长度在6~14时', function () {
      wrapper.setData({registForm: {pass: '1234567'}});

      setTimeout(function () {
        let item = wrapper.findAll('.el-form-item').at(1);
        item.find('.el-input').trigger('blur');
          expect(item.is('.el-form-item__error')).toBe(false);
      }, 1000);
  });
  it('密码长度大于14时', function () {
      wrapper.setData({registForm: {pass: '1234567891234567'}});

      setTimeout(function () {
        let item = wrapper.findAll('.el-form-item').at(1);
        item.find('.el-input').trigger('blur');
          expect(item.find('.el-form-item__error').length).toBe(1);
          expect(item.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass[1].message);
      }, 1000);
  });
  it('密码为空时', function () {
      wrapper.setData({registForm: {pass: ''}});

      setTimeout(function () {
        let item = wrapper.findAll('.el-form-item').at(1);
        item.find('.el-input').trigger('blur');
          expect(item.find('.el-form-item__error').length).toBe(1);
          expect(item.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass[0].message);
      }, 1000);
  });

  // 再次输入密码
  it('确认密码为空时', function () {
      wrapper.setData({registForm: {pass2: ''}});

      setTimeout(function () {
        let item = wrapper.findAll('.el-form-item').at(2);
        item.find('.el-input').trigger('blur');
          expect(item.find('.el-form-item__error').length).toBe(2);
          expect(item.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass2[0].message);
      }, 1000);
  });
  it('密码不一致时', function () {
      wrapper.setData({registForm: {pass: '12345678'}});
      wrapper.setData({registForm: {pass2: '1234567'}});

      setTimeout(function () {
        let item = wrapper.findAll('.el-form-item').at(2);
        item.find('.el-input').trigger('blur');
          expect(item.find('.el-form-item__error').length).toBe(2);
          expect(item.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass2[1].message);
      }, 1000);
  });

    // 点击阅读协议
    it('点击阅读协议，显示协议', function () {
        wrapper.find('.common-wrap .agreement span').trigger('click');
        expect(wrapper.vm.agreementVisible).toBeTruthy();
    });
    it('关闭协议', function () {
        wrapper.vm.$emit('closeAgreement', false);
        expect(wrapper.emitted().closeAgreement).toBeTruthy();
        wrapper.vm.closeAgreement();
        expect(wrapper.vm.agreementVisible).toBeFalsy();
    });

    // 勾选协议
    it('勾选协议 ', function () {
        expect(wrapper.vm.argreementActive).toBeTruthy();
        wrapper.find('.agreement-img').trigger('click');
        expect(wrapper.vm.argreementActive).toBeFalsy();
        wrapper.find('.agreement-img').trigger('click');
        expect(wrapper.vm.argreementActive).toBeTruthy();
    });

    // 取消按钮
    it('点击取消按钮', function () {
        wrapper.find('.cancel-btn').trigger('click');
        expect(wrapper.emitted().registInfoCancel).toBeTruthy();
        expect(wrapper.vm.registForm.username).toBe('');
        expect(wrapper.vm.registForm.pass).toBe('');
        expect(wrapper.vm.registForm.pass2).toBe('');
        expect(wrapper.vm.registForm.reference).toBe('');
    });

    // 注册按钮
    it('输入为空时，点击注册 ', () => {
        // wrapper.find('.confirm-btn').trigger('click');
        setTimeout((done) => {
          let nameItem = wrapper.findAll('.el-form-item').at(0);
          nameItem.find('.el-input').trigger('blur');
            expect(nameItem.find('.el-form-item__error').length).toBe(1);
            expect(nameItem.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.username[0].message);
            done();
        }, 1000);


        // 在数据改变之后，界面的变化会有一定延时。不用timeout有时候会发现界面没有变化
        // 异步测试必须以 done() 方法结尾。setTimeout 和 vm.$nextTick 是常用的异步测试,告诉Mocha测试结束
        setTimeout((done) => {
          let item = wrapper.findAll('.el-form-item').at(1);
          item.find('.el-input').trigger('blur');
            expect(item.find('.el-form-item__error').length).toBe(1);
            expect(item.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass[0].message);
            done();
        }, 1000);


        setTimeout((done) => {
          let itemA = wrapper.findAll('.el-form-item').at(2);
          itemA.find('.el-input').trigger('blur');
            expect(itemA.find('.el-form-item__error').length).toBe(2);
            expect(itemA.find('.el-form-item__error').text()).toBe(wrapper.vm.registRules.pass2[0].message);
            done();
        }, 1000);
    });
  /*it('输入信息正确，点击注册，触发注册事件', () => {
       setTimeout(() => {
           wrapper.findAll('.el-form-item').at(0).find('input').setValue('1234567');
           wrapper.findAll('.el-form-item').at(1).find('input').setValue('1234567');
           wrapper.findAll('.el-form-item').at(2).find('input').setValue('1234567');
           wrapper.find('.confirm-btn').trigger('click');
           expect(wrapper.emitted().registInfoConfirm).toBeTruthy();
       },1000)
  });*/
});
