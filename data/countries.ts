interface ICountry {
  label: string
  value: string
  iso: string
}

const countries: ICountry[] = [
  {
    'label': 'Afghanistan',
    'value': 'Afghanistan',
    'iso': 'af'
  },
  {
    'label': 'Albania',
    'value': 'Albania',
    'iso': 'al'
  },
  {
    'label': 'Algeria',
    'value': 'Algeria',
    'iso': 'dz'
  },
  {
    'label': 'Andorra',
    'value': 'Andorra',
    'iso': 'ad'
  },
  {
    'label': 'Angola',
    'value': 'Angola',
    'iso': 'ao'
  },
  {
    'label': 'Antigua and Barbuda',
    'value': 'Antigua and Barbuda',
    'iso': 'ag'
  },
  {
    'label': 'Argentina',
    'value': 'Argentina',
    'iso': 'ar'
  },
  {
    'label': 'Armenia',
    'value': 'Armenia',
    'iso': 'am'
  },
  {
    'label': 'Australia',
    'value': 'Australia',
    'iso': 'au'
  },
  {
    'label': 'Austria',
    'value': 'Austria',
    'iso': 'at'
  },
  {
    'label': 'Azerbaijan',
    'value': 'Azerbaijan',
    'iso': 'az'
  },
  {
    'label': 'Bahrain',
    'value': 'Bahrain',
    'iso': 'bh'
  },
  {
    'label': 'Bangladesh',
    'value': 'Bangladesh',
    'iso': 'bd'
  },
  {
    'label': 'Barbados',
    'value': 'Barbados',
    'iso': 'bb'
  },
  {
    'label': 'Belarus',
    'value': 'Belarus',
    'iso': 'by'
  },
  {
    'label': 'Belgium',
    'value': 'Belgium',
    'iso': 'be'
  },
  {
    'label': 'Belize',
    'value': 'Belize',
    'iso': 'bz'
  },
  {
    'label': 'Benin',
    'value': 'Benin',
    'iso': 'bj'
  },
  {
    'label': 'Bhutan',
    'value': 'Bhutan',
    'iso': 'bt'
  },
  {
    'label': 'Bolivia',
    'value': 'Bolivia',
    'iso': 'bo'
  },
  {
    'label': 'Bosnia and Herzegovina',
    'value': 'Bosnia and Herzegovina',
    'iso': 'ba'
  },
  {
    'label': 'Botswana',
    'value': 'Botswana',
    'iso': 'bw'
  },
  {
    'label': 'Brazil',
    'value': 'Brazil',
    'iso': 'br'
  },
  {
    'label': 'Brunei',
    'value': 'Brunei',
    'iso': 'bn'
  },
  {
    'label': 'Bulgaria',
    'value': 'Bulgaria',
    'iso': 'bg'
  },
  {
    'label': 'Burkina Faso',
    'value': 'Burkina Faso',
    'iso': 'bf'
  },
  {
    'label': 'Burundi',
    'value': 'Burundi',
    'iso': 'bi'
  },
  {
    'label': 'Cambodia',
    'value': 'Cambodia',
    'iso': 'kh'
  },
  {
    'label': 'Cameroon',
    'value': 'Cameroon',
    'iso': 'cm'
  },
  {
    'label': 'Canada',
    'value': 'Canada',
    'iso': 'ca'
  },
  {
    'label': 'Cape Verde',
    'value': 'Cape Verde',
    'iso': 'cv'
  },
  {
    'label': 'Chad',
    'value': 'Chad',
    'iso': 'td'
  },
  {
    'label': 'Chile',
    'value': 'Chile',
    'iso': 'cl'
  },
  {
    'label': 'China',
    'value': 'China',
    'iso': 'cn'
  },
  {
    'label': 'Colombia',
    'value': 'Colombia',
    'iso': 'co'
  },
  {
    'label': 'Comoros',
    'value': 'Comoros',
    'iso': 'km'
  },
  {
    'label': 'Congo',
    'value': 'Congo',
    'iso': 'cd'
  },
  {
    'label': 'Costa Rica',
    'value': 'Costa Rica',
    'iso': 'cr'
  },
  {
    'label': "Cote d'Ivoire",
    'value': "Cote d'Ivoire",
    'iso': 'ci'
  },
  {
    'label': 'Croatia',
    'value': 'Croatia',
    'iso': 'hr'
  },
  {
    'label': 'Cuba',
    'value': 'Cuba',
    'iso': 'cu'
  },
  {
    'label': 'Cyprus',
    'value': 'Cyprus',
    'iso': 'cy'
  },
  {
    'label': 'Czech Republic',
    'value': 'Czech Republic',
    'iso': 'cz'
  },
  {
    'label': 'Denmark',
    'value': 'Denmark',
    'iso': 'dk'
  },
  {
    'label': 'Djibouti',
    'value': 'Djibouti',
    'iso': 'dj'
  },
  {
    'label': 'Dominica',
    'value': 'Dominica',
    'iso': 'dm'
  },
  {
    'label': 'Dominican Republic',
    'value': 'Dominican Republic',
    'iso': 'do'
  },
  {
    'label': 'East Timor',
    'value': 'East Timor',
    'iso': 'tl'
  },
  {
    'label': 'Ecuador',
    'value': 'Ecuador',
    'iso': 'ec'
  },
  {
    'label': 'Egypt',
    'value': 'Egypt',
    'iso': 'eg'
  },
  {
    'label': 'El Salvador',
    'value': 'El Salvador',
    'iso': 'sv'
  },
  {
    'label': 'Equatorial Guinea',
    'value': 'Equatorial Guinea',
    'iso': 'gq'
  },
  {
    'label': 'Eritrea',
    'value': 'Eritrea',
    'iso': 'er'
  },
  {
    'label': 'Estonia',
    'value': 'Estonia',
    'iso': 'ee'
  },
  {
    'label': 'Ethiopia',
    'value': 'Ethiopia',
    'iso': 'et'
  },
  {
    'label': 'Fiji',
    'value': 'Fiji',
    'iso': 'fj'
  },
  {
    'label': 'Finland',
    'value': 'Finland',
    'iso': 'fi'
  },
  {
    'label': 'France',
    'value': 'France',
    'iso': 'fr'
  },
  {
    'label': 'Gabon',
    'value': 'Gabon',
    'iso': 'ga'
  },
  {
    'label': 'Gambia',
    'value': 'Gambia',
    'iso': 'gm'
  },
  {
    'label': 'Georgia',
    'value': 'Georgia',
    'iso': 'ge'
  },
  {
    'label': 'Germany',
    'value': 'Germany',
    'iso': 'de'
  },
  {
    'label': 'Ghana',
    'value': 'Ghana',
    'iso': 'gh'
  },
  {
    'label': 'Greece',
    'value': 'Greece',
    'iso': 'gr'
  },
  {
    'label': 'Greenland',
    'value': 'Greenland',
    'iso': 'gl'
  },
  {
    'label': 'Grenada',
    'value': 'Grenada',
    'iso': 'gd'
  },
  {
    'label': 'Guatemala',
    'value': 'Guatemala',
    'iso': 'gt'
  },
  {
    'label': 'Guinea',
    'value': 'Guinea',
    'iso': 'gn'
  },
  {
    'label': 'Guinea-Bissau',
    'value': 'Guinea-Bissau',
    'iso': 'gw'
  },
  {
    'label': 'Guyana',
    'value': 'Guyana',
    'iso': 'gy'
  },
  {
    'label': 'Haiti',
    'value': 'Haiti',
    'iso': 'ht'
  },
  {
    'label': 'Honduras',
    'value': 'Honduras',
    'iso': 'hn'
  },
  {
    'label': 'Hungary',
    'value': 'Hungary',
    'iso': 'hu'
  },
  {
    'label': 'Iceland',
    'value': 'Iceland',
    'iso': 'is'
  },
  {
    'label': 'India',
    'value': 'India',
    'iso': 'in'
  },
  {
    'label': 'Indonesia',
    'value': 'Indonesia',
    'iso': 'id'
  },
  {
    'label': 'Iran',
    'value': 'Iran',
    'iso': 'ir'
  },
  {
    'label': 'Iraq',
    'value': 'Iraq',
    'iso': 'iq'
  },
  {
    'label': 'Ireland',
    'value': 'Ireland',
    'iso': 'ie'
  },
  {
    'label': 'Israel',
    'value': 'Israel',
    'iso': 'il'
  },
  {
    'label': 'Italy',
    'value': 'Italy',
    'iso': 'it'
  },
  {
    'label': 'Jamaica',
    'value': 'Jamaica',
    'iso': 'jm'
  },
  {
    'label': 'Japan',
    'value': 'Japan',
    'iso': 'jp'
  },
  {
    'label': 'Jordan',
    'value': 'Jordan',
    'iso': 'jo'
  },
  {
    'label': 'Kazakhstan',
    'value': 'Kazakhstan',
    'iso': 'kz'
  },
  {
    'label': 'Kenya',
    'value': 'Kenya',
    'iso': 'ke'
  },
  {
    'label': 'Kiribati',
    'value': 'Kiribati',
    'iso': 'ki'
  },
  {
    'label': 'Kuwait',
    'value': 'Kuwait',
    'iso': 'kw'
  },
  {
    'label': 'Kyrgyzstan',
    'value': 'Kyrgyzstan',
    'iso': 'kg'
  },
  {
    'label': 'Laos',
    'value': 'Laos',
    'iso': 'la'
  },
  {
    'label': 'Latvia',
    'value': 'Latvia',
    'iso': 'lv'
  },
  {
    'label': 'Lebanon',
    'value': 'Lebanon',
    'iso': 'lb'
  },
  {
    'label': 'Lesotho',
    'value': 'Lesotho',
    'iso': 'ls'
  },
  {
    'label': 'Liberia',
    'value': 'Liberia',
    'iso': 'lr'
  },
  {
    'label': 'Libya',
    'value': 'Libya',
    'iso': 'ly'
  },
  {
    'label': 'Liechtenstein',
    'value': 'Liechtenstein',
    'iso': 'li'
  },
  {
    'label': 'Lithuania',
    'value': 'Lithuania',
    'iso': 'lt'
  },
  {
    'label': 'Luxembourg',
    'value': 'Luxembourg',
    'iso': 'lu'
  },
  {
    'label': 'Macedonia',
    'value': 'Macedonia',
    'iso': 'mk'
  },
  {
    'label': 'Madagascar',
    'value': 'Madagascar',
    'iso': 'mg'
  },
  {
    'label': 'Malawi',
    'value': 'Malawi',
    'iso': 'mw'
  },
  {
    'label': 'Malaysia',
    'value': 'Malaysia',
    'iso': 'my'
  },
  {
    'label': 'Maldives',
    'value': 'Maldives',
    'iso': 'mv'
  },
  {
    'label': 'Mali',
    'value': 'Mali',
    'iso': 'ml'
  },
  {
    'label': 'Malta',
    'value': 'Malta',
    'iso': 'mt'
  },
  {
    'label': 'Marshall Islands',
    'value': 'Marshall Islands',
    'iso': 'mh'
  },
  {
    'label': 'Mauritania',
    'value': 'Mauritania',
    'iso': 'mr'
  },
  {
    'label': 'Mauritius',
    'value': 'Mauritius',
    'iso': 'mu'
  },
  {
    'label': 'Mexico',
    'value': 'Mexico',
    'iso': 'mx'
  },
  {
    'label': 'Moldova',
    'value': 'Moldova',
    'iso': 'md'
  },
  {
    'label': 'Monaco',
    'value': 'Monaco',
    'iso': 'mc'
  },
  {
    'label': 'Mongolia',
    'value': 'Mongolia',
    'iso': 'mn'
  },
  {
    'label': 'Montenegro',
    'value': 'Montenegro',
    'iso': 'me'
  },
  {
    'label': 'Morocco',
    'value': 'Morocco',
    'iso': 'ma'
  },
  {
    'label': 'Mozambique',
    'value': 'Mozambique',
    'iso': 'mz'
  },
  {
    'label': 'Myanmar',
    'value': 'Myanmar',
    'iso': 'mm'
  },
  {
    'label': 'Namibia',
    'value': 'Namibia',
    'iso': 'na'
  },
  {
    'label': 'Nauru',
    'value': 'Nauru',
    'iso': 'nr'
  },
  {
    'label': 'Nepal',
    'value': 'Nepal',
    'iso': 'np'
  },
  {
    'label': 'Netherlands',
    'value': 'Netherlands',
    'iso': 'nl'
  },
  {
    'label': 'New Zealand',
    'value': 'New Zealand',
    'iso': 'nz'
  },
  {
    'label': 'Nicaragua',
    'value': 'Nicaragua',
    'iso': 'ni'
  },
  {
    'label': 'Niger',
    'value': 'Niger',
    'iso': 'ne'
  },
  {
    'label': 'Nigeria',
    'value': 'Nigeria',
    'iso': 'ng'
  },
  {
    'label': 'North Korea',
    'value': 'North Korea',
    'iso': 'kp'
  },
  {
    'label': 'Norway',
    'value': 'Norway',
    'iso': 'no'
  },
  {
    'label': 'Oman',
    'value': 'Oman',
    'iso': 'om'
  },
  {
    'label': 'Pakistan',
    'value': 'Pakistan',
    'iso': 'pk'
  },
  {
    'label': 'Palau',
    'value': 'Palau',
    'iso': 'pw'
  },
  {
    'label': 'Panama',
    'value': 'Panama',
    'iso': 'pa'
  },
  {
    'label': 'Papua New Guinea',
    'value': 'Papua New Guinea',
    'iso': 'pg'
  },
  {
    'label': 'Paraguay',
    'value': 'Paraguay',
    'iso': 'py'
  },
  {
    'label': 'Peru',
    'value': 'Peru',
    'iso': 'pe'
  },
  {
    'label': 'Philippines',
    'value': 'Philippines',
    'iso': 'ph'
  },
  {
    'label': 'Poland',
    'value': 'Poland',
    'iso': 'pl'
  },
  {
    'label': 'Portugal',
    'value': 'Portugal',
    'iso': 'pt'
  },
  {
    'label': 'Qatar',
    'value': 'Qatar',
    'iso': 'qa'
  },
  {
    'label': 'Romania',
    'value': 'Romania',
    'iso': 'ro'
  },
  {
    'label': 'Russia',
    'value': 'Russia',
    'iso': 'ru'
  },
  {
    'label': 'Rwanda',
    'value': 'Rwanda',
    'iso': 'rw'
  },
  {
    'label': 'Saint Kitts and Nevis',
    'value': 'Saint Kitts and Nevis',
    'iso': 'kn'
  },
  {
    'label': 'Saint Lucia',
    'value': 'Saint Lucia',
    'iso': 'lc'
  },
  {
    'label': 'Saint Vincent and the Grenadines',
    'value': 'Saint Vincent and the Grenadines',
    'iso': 'vc'
  },
  {
    'label': 'Samoa',
    'value': 'Samoa',
    'iso': 'ws'
  },
  {
    'label': 'San Marino',
    'value': 'San Marino',
    'iso': 'sm'
  },
  {
    'label': 'Sao Tome and Principe',
    'value': 'Sao Tome and Principe',
    'iso': 'st'
  },
  {
    'label': 'Saudi Arabia',
    'value': 'Saudi Arabia',
    'iso': 'sa'
  },
  {
    'label': 'Senegal',
    'value': 'Senegal',
    'iso': 'sn'
  },
  {
    'label': 'Serbia',
    'value': 'Serbia',
    'iso': 'rs'
  },
  {
    'label': 'Seychelles',
    'value': 'Seychelles',
    'iso': 'sc'
  },
  {
    'label': 'Sierra Leone',
    'value': 'Sierra Leone',
    'iso': 'sl'
  },
  {
    'label': 'Singapore',
    'value': 'Singapore',
    'iso': 'sg'
  },
  {
    'label': 'Slovakia',
    'value': 'Slovakia',
    'iso': 'sk'
  },
  {
    'label': 'Slovenia',
    'value': 'Slovenia',
    'iso': 'si'
  },
  {
    'label': 'Solomon Islands',
    'value': 'Solomon Islands',
    'iso': 'sb'
  },
  {
    'label': 'Somalia',
    'value': 'Somalia',
    'iso': 'so'
  },
  {
    'label': 'South Africa',
    'value': 'South Africa',
    'iso': 'za'
  },
  {
    'label': 'South Korea',
    'value': 'South Korea',
    'iso': 'kr'
  },
  {
    'label': 'South Sudan',
    'value': 'South Sudan',
    'iso': 'ss'
  },
  {
    'label': 'Spain',
    'value': 'Spain',
    'iso': 'es'
  },
  {
    'label': 'Sri Lanka',
    'value': 'Sri Lanka',
    'iso': 'lk'
  },
  {
    'label': 'Sudan',
    'value': 'Sudan',
    'iso': 'sd'
  },
  {
    'label': 'Suriname',
    'value': 'Suriname',
    'iso': 'sr'
  },
  {
    'label': 'Swaziland',
    'value': 'Swaziland',
    'iso': 'sz'
  },
  {
    'label': 'Sweden',
    'value': 'Sweden',
    'iso': 'se'
  },
  {
    'label': 'Switzerland',
    'value': 'Switzerland',
    'iso': 'ch'
  },
  {
    'label': 'Syria',
    'value': 'Syria',
    'iso': 'sy'
  },
  {
    'label': 'Taiwan',
    'value': 'Taiwan',
    'iso': 'tw'
  },
  {
    'label': 'Tajikistan',
    'value': 'Tajikistan',
    'iso': 'tj'
  },
  {
    'label': 'Tanzania',
    'value': 'Tanzania',
    'iso': 'tz'
  },
  {
    'label': 'Thailand',
    'value': 'Thailand',
    'iso': 'th'
  },
  {
    'label': 'The Bahamas',
    'value': 'The Bahamas',
    'iso': 'bs'
  },
  {
    'label': 'The Central African Republic',
    'value': 'The Central African Republic',
    'iso': 'cf'
  },
  {
    'label': 'The Federated States of Micronesia',
    'value': 'The Federated States of Micronesia',
    'iso': 'fm'
  },
  {
    'label': 'United Arab Emirates',
    'value': 'United Arab Emirates',
    'iso': 'ae'
  },
  {
    'label': 'United States of America',
    'value': 'United States of America',
    'iso': 'us'
  },
  {
    'label': 'Togo',
    'value': 'Togo',
    'iso': 'tg'
  },
  {
    'label': 'Tonga',
    'value': 'Tonga',
    'iso': 'to'
  },
  {
    'label': 'Trinidad and Tobago',
    'value': 'Trinidad and Tobago',
    'iso': 'tt'
  },
  {
    'label': 'Tunisia',
    'value': 'Tunisia',
    'iso': 'tn'
  },
  {
    'label': 'Turkey',
    'value': 'Turkey',
    'iso': 'tr'
  },
  {
    'label': 'Turkmenistan',
    'value': 'Turkmenistan',
    'iso': 'tm'
  },
  {
    'label': 'Tuvalu',
    'value': 'Tuvalu',
    'iso': 'tv'
  },
  {
    'label': 'Uganda',
    'value': 'Uganda',
    'iso': 'ug'
  },
  {
    'label': 'Ukraine',
    'value': 'Ukraine',
    'iso': 'ua'
  },
  {
    'label': 'United Kingdom',
    'value': 'United Kingdom',
    'iso': 'gb'
  },
  {
    'label': 'Uruguay',
    'value': 'Uruguay',
    'iso': 'uy'
  },
  {
    'label': 'Uzbekistan',
    'value': 'Uzbekistan',
    'iso': 'uz'
  },
  {
    'label': 'Vanuatu',
    'value': 'Vanuatu',
    'iso': 'vu'
  },
  {
    'label': 'Vatican City',
    'value': 'Vatican City',
    'iso': 'va'
  },
  {
    'label': 'Venezuela',
    'value': 'Venezuela',
    'iso': 've'
  },
  {
    'label': 'Vietnam',
    'value': 'Vietnam',
    'iso': 'vn'
  },
  {
    'label': 'Yemen',
    'value': 'Yemen',
    'iso': 'ye'
  },
  {
    'label': 'Zambia',
    'value': 'Zambia',
    'iso': 'zm'
  },
  {
    'label': 'Zimbabwe',
    'value': 'Zimbabwe',
    'iso': 'zw'
  }
];

export default countries;
