interface FormatBytesOptions {
  base?: 1000 | 1024
  decimals?: number
  integer?: boolean
}

export function formatBytes(
  bytes: number | null | undefined,
  opts: FormatBytesOptions = {}
): string {
  const { base = 1000, decimals = 1, integer = false } = opts

  if (bytes === null || bytes === undefined || isNaN(bytes) || !isFinite(bytes)) {
    return '0 B'
  }

  const absoluteBytes = Math.abs(bytes)

  if (absoluteBytes === 0) {
    return '0 B'
  }

  const units =
    base === 1024 ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] : ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  const exponent = Math.floor(Math.log(absoluteBytes) / Math.log(base))
  const unitIndex = Math.min(exponent, units.length - 1)

  let value = absoluteBytes / Math.pow(base, unitIndex)

  if (integer) {
    value = Math.round(value)
  } else {
    const rounded = value.toFixed(decimals)
    value = parseFloat(rounded)
  }
  return `${value} ${units[unitIndex]}`
}
