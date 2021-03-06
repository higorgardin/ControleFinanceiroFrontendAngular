import { OnInit, Directive } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => {
        this.resources = resources.sort((a, b) => b.id - a.id);
      },
      error => alert('Erro ao buscar a lista')
    );
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete)
      this.resourceService.delete(resource.id).subscribe(
        () => (this.resources = this.resources.filter(element => element !== resource)),
        error => alert('Erro ao excluir item')
      );
  }
}
