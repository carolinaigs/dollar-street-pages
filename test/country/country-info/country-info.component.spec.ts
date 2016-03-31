import {
  it,
  describe,
  expect,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';

import {MockCommonDependency} from '../../common-mocks/mocked.services'
import {MockService} from '../../common-mocks/mock.service.template'
import {info} from "../mocks/data.ts";

import {CountryInfoComponent} from '../../../app/country/country-info/country-info.component';

describe("CountryInfoComponent", () => {
  let countryInfoService = new MockService();
  countryInfoService.serviceName = 'CountryInfoService';
  countryInfoService.getMethod = 'getCountryInfo';
  countryInfoService.fakeResponse = info;
  let mockCommonDependency = new MockCommonDependency();
  beforeEachProviders(() => {
    return [
      mockCommonDependency.getProviders(),
      countryInfoService.getProviders()
    ];
  });
  it("CountryInfoComponent must init ", injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(CountryInfoComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(context.placesQantity).toEqual(7);
      expect(context.photosQantity).toEqual(1223)
    })
  }));
  it("CountryInfoComponent must destroy ", injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(CountryInfoComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      fixture.destroy()
      expect(countryInfoService.isUnsubscribe).toBe(true);
    })
  }));
  it("CountryInfoComponent must showMore ", injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(CountryInfoComponent).then((fixture) => {
      let context = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(context.isShowInfoMore(context.country)).toEqual(context.country.description)
    })
  }));
});

