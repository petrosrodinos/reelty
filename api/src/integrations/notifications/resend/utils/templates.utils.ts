import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { EmailTemplate } from '../interfaces/mail.interfaces';

/**
 * Renders the branded Handlebars emails. `_layout.hbs` is registered as the `layout` partial
 * (`{{#> layout}}...{{/layout}}`), every other `<name>.hbs` is a template.
 */
@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);
  private readonly hbs = Handlebars.create();
  private readonly compiled = new Map<string, HandlebarsTemplateDelegate>();
  private templatesPath: string | null = null;
  private layoutRegistered = false;

  /** Works from `src` (ts-node) and from the nest build (`dist/src/integrations/notifications/templates`). */
  private resolveTemplatesPath(): string {
    if (this.templatesPath) return this.templatesPath;
    const candidates = [
      path.join(__dirname, '..', '..', 'templates'),
      path.join(process.cwd(), 'dist', 'src', 'integrations', 'notifications', 'templates'),
      path.join(process.cwd(), 'src', 'integrations', 'notifications', 'templates'),
    ];
    const found = candidates.find((p) => fs.existsSync(path.join(p, '_layout.hbs')));
    if (!found) throw new Error('Email templates directory not found');
    this.templatesPath = found;
    return found;
  }

  private ensureLayout() {
    if (this.layoutRegistered) return;
    const layout = fs.readFileSync(path.join(this.resolveTemplatesPath(), '_layout.hbs'), 'utf8');
    this.hbs.registerPartial('layout', layout);
    this.layoutRegistered = true;
  }

  private load(name: string): HandlebarsTemplateDelegate {
    const cached = this.compiled.get(name);
    if (cached) return cached;
    this.ensureLayout();
    const source = fs.readFileSync(path.join(this.resolveTemplatesPath(), `${name}.hbs`), 'utf8');
    const template = this.hbs.compile(source);
    this.compiled.set(name, template);
    return template;
  }

  async renderTemplate(templateName: EmailTemplate, data: Record<string, unknown>): Promise<string> {
    try {
      return this.load(templateName)(data);
    } catch (error) {
      this.logger.error(`Failed to render template ${templateName}: ${(error as Error).message}`);
      throw new Error(`Failed to render template ${templateName}`);
    }
  }
}
