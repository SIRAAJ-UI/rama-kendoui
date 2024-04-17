import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePlaceholder',
  standalone: true,
})
export class ReplacePlaceholderPipe implements PipeTransform {
  transform(value: string, placeholders: string[]): string {
    // Replace each placeholder in the value string with the corresponding replacement
    return value.replace(/\{\d+\}/g, (match) => {
      const indexMatch = match.match(/\d+/);
      if (indexMatch) {
        const index = parseInt(indexMatch[0]); // Extract the placeholder index
        return placeholders[index] || match; // Return the replacement if available, otherwise the original placeholder
      }
      return match; // Return the original placeholder if it doesn't contain a number
    });
  }
}
