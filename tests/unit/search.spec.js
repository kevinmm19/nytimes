import Vue from 'vue';
import Search from '@/components/Search.vue'

describe('Search.vue', () => {
  it('has a find & fetch hooks', () => {
    const vm = new Vue(Search).$mount()
    expect(typeof vm.find).toBe('function');
    expect(typeof vm.fetch).toBe('function');
  });
  it('sets the correct default data', () => {
    expect(typeof Search.data).toBe('function');
    const defaultData = Search.data();
    expect(defaultData.search).toBe('');
  });
})
