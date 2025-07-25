import { AddressComponent } from '@/types';

export function getAddressPart(
  components: AddressComponent[],
  type: string
): string {
  return components.find((c) => c.types.includes(type))?.long_name || '';
}

export function sanitizeAddress(
  components: AddressComponent[],
  formatted: string
): string {
  const route = getAddressPart(components, 'route');
  const number = getAddressPart(components, 'street_number');
  const city = getAddressPart(components, 'locality') || getAddressPart(components, 'postal_town');
  const country = getAddressPart(components, 'country');

  let address = route && number ? `${route} ${number}` : formatted;

  if (city) {
    address = address.replace(new RegExp(`,?\\s*${city}`, 'i'), '');
  }

  if (country) {
    address = address.replace(new RegExp(`,?\\s*${country}`, 'i'), '');
  }

  return address.trim();
}
