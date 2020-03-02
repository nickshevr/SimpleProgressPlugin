ProgressBarPlugin дает оверхед на сборку с 0 от 10 до 20секунд из-за того, что использует встроенный `ProgressPlugin` вебпака (линейно зависит от кол-ва обработынных модулей).
При инкрементальной сборке оверхеда почти нет.

На примере проекта с ~5k модулей:
```
SMP ⏱
General output time took 2 mins, 55.92 secs
SMP ⏱ Plugins
ProgressPlugin took 19.54 secs
```

Проект с 3к модулей:

```
SMP ⏱
General output time took 1 min, 58.37 secs
SMP ⏱ Plugins
ProgressPlugin took 13.43 secs
```

Инкрементальная сборка:
```
SMP ⏱
General output time took 8.28 secs
SMP ⏱ Plugins
WrapperPlugin took 3.98 secs
WebpackAssetsManifest took 3.97 secs
ProgressPlugin took 0.181 secs
```

Мой плагин дает константу вне зависимости от кол-ва модулей.
На примере проекта с ~3к модулей:
```
 SMP  ⏱
General output time took 2 mins, 11.63 secs

 SMP  ⏱  Plugins
SimpleProgressPlugin took 0.044 secs
```

