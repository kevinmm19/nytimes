import Vue from 'vue';
import News from '@/components/News.vue'

describe('News.vue', () => {
  it('has a find, flip and reset hooks', () => {
    const vm = new Vue(News).$mount()
    expect(typeof vm.find).toBe('function');
    expect(typeof vm.flip).toBe('function');
    expect(typeof vm.reset).toBe('function');
  });
  it('sets the correct default data', () => {
    expect(typeof News.data).toBe('function');
    const defaultData = News.data();
    expect(defaultData.search).toBe('');
  });
})
