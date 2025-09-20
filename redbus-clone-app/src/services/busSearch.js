import { busData } from '../data/busData';

class BusSearchService {
  // sting matching
  static matchString(str1, str2) {
    if (!str1 || !str2) return false;
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

  // Normalize date to YYYY-MM-DD
  static normalizeDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  // Search buses by from, to, date
  static searchBuses({ from, to, date }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = busData?.filter((bus) => {
          let matches = true;

          if (from) matches = matches && this.matchString(bus?.route?.from, from);
          if (to) matches = matches && this.matchString(bus?.route?.to, to);
          if (date) {
            matches =
              matches &&
              this.normalizeDate(bus?.travelDate) === this.normalizeDate(date);
          }

          return matches;
        }) || [];

        resolve({ results: filtered, total: filtered?.length || 0 });
      }, 500);
    });
  }

  // Get all unique cities
  static getCities() {
    const cities = new Set();
    busData?.forEach((bus) => {
      if (bus?.route?.from) cities.add(bus?.route?.from);
      if (bus?.route?.to) cities.add(bus?.route?.to);
    });
    return Array.from(cities).sort();
  }

  // Get popular routes (top 10)
  static getPopularRoutes() {
    const routeCount = {};
    busData?.forEach((bus) => {
      const key = `${bus?.route?.from}-${bus?.route?.to}`;
      routeCount[key] = (routeCount[key] || 0) + 1;
    });

    return Object.entries(routeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([route]) => {
        const [from, to] = route.split('-');
        return { from, to };
      });
  }

  // Get bus by ID
  static getBusById(id) {
    return busData?.find((bus) => bus?.id === parseInt(id));
  }

  // Filter buses with optional filters: departureTime, busType, priceRange, sortBy
  static filterBuses(buses = [], filters = {}) {
    let result = [...buses];

    if (filters?.departureTime) {
      result = result.filter((bus) => {
        const hour = parseInt(bus?.departureTime?.split(':')?.[0] || '0');
        if (filters.departureTime === 'early') return hour >= 6 && hour < 12;
        if (filters.departureTime === 'mid') return hour >= 12 && hour < 18;
        if (filters.departureTime === 'late') return hour >= 18 || hour < 6;
        return true;
      });
    }

    if (filters?.busType) {
      result = result.filter((bus) =>
        bus?.busType?.toLowerCase()?.includes(filters?.busType?.toLowerCase())
      );
    }

    if (filters?.priceRange) {
      const [min, max] = filters?.priceRange?.split('-')?.map(Number) || [];
      result = result.filter(
        (bus) => (bus?.price || 0) >= (min || 0) && (max ? (bus?.price || 0) <= max : true)
      );
    }

    if (filters?.sortBy) {
      result.sort((a, b) => {
        if (filters?.sortBy === 'price') return (a?.price || 0) - (b?.price || 0);
        if (filters?.sortBy === 'duration') return this.parseDuration(a?.duration) - this.parseDuration(b?.duration);
        if (filters?.sortBy === 'rating') return (b?.rating || 0) - (a?.rating || 0);
        if (filters?.sortBy === 'departure') return this.parseTime(a?.departureTime) - this.parseTime(b?.departureTime);
        return 0;
      });
    }

    return result;
  }

  static parseDuration(duration) {
    const match = duration?.match(/(\d+)h\s*(\d+)m/);
    return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
  }

  static parseTime(time) {
    const [hours, minutes] = time?.split(':')?.map(Number) || [0, 0];
    return hours * 60 + minutes;
  }
}

export default BusSearchService;
