import { Component, OnInit } from '@angular/core';

import { CountryDataService } from './services/country-data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: any[];
  filteredCountries: any[];
  _countryListFilter: string;
  searchPlaceHolder = 'Search for a country...';
  filterByLabel = 'Filter by Region';

  regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  constructor(private countryDataService: CountryDataService) {}

  get countryListFilter(): string {
    return this._countryListFilter;
  }

  set countryListFilter(value: string) {
    this._countryListFilter = value;
    this.filteredCountries = this.countryListFilter
      ? this.searchCountryByName(this.countryListFilter)
      : this.countries;
  }

  ngOnInit() {
    this.countryDataService.getAllCountries().subscribe((data: any[]) => {
      console.log(data);
      this.countries = data;
    });
  }

  openSelection() {
    const options = document.getElementById('region-names');
    options.classList.toggle('is-open');
  }

  searchCountryByName(filterValue: string) {
    filterValue = filterValue.toLowerCase();
    return this.countries.filter(
      country => country.name.toLowerCase().indexOf(filterValue) !== -1
    );
  }
}
