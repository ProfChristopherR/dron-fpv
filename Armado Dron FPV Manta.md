# **Manual de Ingeniería, Armado y Programación de Sistemas Aéreos Pilotados a Distancia: Plataforma Multirrotor de 3.6 Pulgadas**

## **Concepto y física del vuelo en primera persona (FPV)**

El vuelo en primera persona (FPV, por sus siglas en inglés *First Person View*) constituye una disciplina avanzada de la robótica aérea y la aviónica de baja escala. Se define como el pilotaje de una aeronave no tripulada mediante una perspectiva visual subjetiva, donde el operador percibe el entorno de vuelo en tiempo real tal como si estuviese a bordo de la cabina de la aeronave1. Esta experiencia inmersiva se logra mediante un sistema de circuito cerrado de transmisión de señales inalámbricas bidireccionales, que comprende la captura de imágenes, el procesamiento de datos, la modulación de radiofrecuencia y la proyección visual de ultra baja latencia.  
La diferencia fundamental entre un multirrotor de FPV de alto rendimiento y un dron comercial estabilizado reside en su sistema de control y en la dinámica de vuelo. Los drones comerciales dependen de algoritmos de nivelación automática y posicionamiento satelital activo que limitan los ángulos de inclinación y estabilizan la aeronave de forma autónoma cuando el piloto no ejerce comandos. En contraste, el vuelo FPV acrobático (modo Acro) opera sin auto-nivelación en los ejes de cabeceo (*pitch*), balanceo (*roll*) y guiñada (*yaw*)3.  
El controlador de vuelo ejecuta un lazo de retroalimentación de control proporcional, integral y derivativo (PID) que interpreta la velocidad angular solicitada por el piloto a través de las palancas de la emisora y la compara de forma constante con las lecturas físicas del sensor giroscópico a bordo4. Esto permite realizar maniobras tridimensionales libres de restricciones angulares, aceleraciones lineales extremas y un guiado de alta precisión en entornos estrechos o complejos6.

## **Clasificaciones, aplicaciones y fundamentos de los sistemas aéreos no tripulados**

Los multirrotores FPV se clasifican de forma principal por su envergadura, el diámetro máximo de sus hélices, el peso bruto y la configuración de su planta de potencia. Estas clasificaciones determinan de manera directa el comportamiento aerodinámico, el nivel de inercia y la especialización operativa de la plataforma.

| Categoría de Aeronave | Tamaño de Hélice | Rango de Peso Típico | Entorno de Operación | Aplicación Principal |
| :---- | :---- | :---- | :---- | :---- |
| **Micro Whoop** | 31 mm a 45 mm8 | 18 g a 45 g | Interiores cerrados | Entrenamiento inicial y carreras recreativas en espacios reducidos. |
| **Toothpick / Ultra-light** | 2.0" a 3.0" | 50 g a 110 g | Parques y exteriores pequeños | Prácticas de acrobacia de baja inercia y bajo nivel de ruido. |
| **Cinewhoop** | 2.5" a 3.5" | 150 g a 450 g | Mixto (cerca de personas)9 | Captura de video cinematográfico en proximidad debido a ductos protectores11. |
| **Micro Freestyle / Cinematic** | 3.5" a 4.0"11 | 100 g a 250 g | Exteriores abiertos9 | Vuelo acrobático libre, grabaciones de media distancia con cámaras de acción ligera4. |
| **Freestyle Estándar** | 5.0" a 5.1" | 550 g a 800 g | Campos abiertos y estructuras | Acrobacia de alta velocidad, resistencia al viento y transporte de cámaras HD pesadas14. |
| **Long Range / Exploración** | 7.0" a 10.0"16 | 800 g a 1800 g | Espacios abiertos de gran extensión | Vuelos de larga distancia, cartografía, exploración y misiones de rescate14. |

### **Dinámica de vuelo y modos de operación**

Los controladores de vuelo modernos procesan la orientación de la aeronave mediante tres modos lógicos principales seleccionables por el usuario:

* **Modo Estabilizado (Angle/Level)**: El giroscopio y el acelerómetro trabajan en conjunto para limitar el ángulo máximo de inclinación (usualmente a ![][image1] o ![][image2])3. Al soltar los mandos de la emisora, la aeronave vuelve de forma inmediata a la posición horizontal respecto al suelo9.  
* **Modo Horizonte (Horizon)**: Permite realizar rotaciones completas de ![][image3] cuando las palancas del mando se llevan a sus límites físicos de recorrido, pero mantiene el comportamiento de nivelación automática cuando los mandos retornan a su posición central de reposo.  
* **Modo Acrobático (Acro)**: El comportamiento de auto-nivelación se desactiva por completo3. El piloto controla de manera directa la velocidad de rotación angular en grados por segundo en los tres ejes espaciales. Si el piloto inclina el dron hacia adelante y suelta el mando, la aeronave mantendrá ese ángulo de inclinación de forma indefinida hasta que reciba un comando opuesto, exigiendo correcciones constantes y un alto nivel de memoria muscular.

### **Enlaces de radiofrecuencia para control (RF)**

El enlace de radiocontrol enlaza la emisora en manos del piloto con el receptor a bordo de la aeronave. El protocolo predominante en la industria actual es **ExpressLRS (ELRS)**, un sistema de código abierto basado en la modulación por espectro ensanchado por salto de frecuencia (FHSS) que opera principalmente en las bandas de 2.4 GHz e ISM de 915 MHz19.  
ELRS destaca por su ultra baja latencia, alta resiliencia ante interferencias en entornos saturados y un alcance kilométrico extraordinario debido al uso de tasas de refresco de paquetes elevadas (hasta 1000 Hz en FLRC) y una alta sensibilidad de recepción20.

### **Enlaces de transmisión de video**

Existen dos tecnologías para el envío de la señal visual desde el vehículo a las gafas:

* **Sistemas Analógicos**: La señal de la cámara se modula en frecuencia (FM) y se transmite de forma directa en la banda de 5.8 GHz sin digitalización previa22. Esto garantiza una latencia de transmisión prácticamente nula (inferior a 15 milisegundos de extremo a extremo), aunque la calidad de la imagen es propensa a interferencias estáticas, desvanecimiento de señal (*multipathing*) y pérdida de nitidez en presencia de obstáculos físicos.  
* **Sistemas Digitales de Alta Definición**: La señal de video se comprime bajo algoritmos de alta eficiencia (H.264 o H.255) y se envía mediante paquetes de datos digitales codificados de manera bidireccional24. Proporciona una claridad visual en alta resolución (![][image4] o ![][image5]) y colores vivos, a costa de una latencia variable y ligeramente superior (entre 20 y 40 milisegundos) y un costo económico significativamente más elevado.

### **Arquitectura de almacenamiento de energía: LiPo vs. LiHV**

La fuente de energía principal para estos vehículos son las baterías basadas en litio:

* **Polímero de Litio (LiPo)**: Tienen un voltaje nominal de ![][image6] por celda y un límite máximo de carga segura de ![][image7] por celda. Ofrecen una alta densidad de corriente y tasas de descarga muy elevadas (comúnmente medidas en factor "C", que indica la capacidad de entrega de corriente continua).  
* **Alto Voltaje de Litio (LiHV)**: Permiten una carga de hasta ![][image8] por celda26. Esto eleva la tensión de salida inicial de la batería, incrementando de manera directa el empuje motor al inicio del vuelo y proporcionando una mayor eficiencia energética y tiempo de operación, aunque disminuye la vida útil general de la batería si no se almacenan bajo el voltaje de conservación adecuado (![][image9] a ![][image10] por celda).

## **Anatomía, funcionamiento y distribución de componentes de un dron FPV**

Cada elemento constitutivo de la aeronave cumple una función específica dentro del balance de fuerzas mecánicas y el flujo de energía eléctrica e información digital.

| Componente | Función Técnica | Principio de Funcionamiento | Ubicación Física Recomendada |
| :---- | :---- | :---- | :---- |
| **Controlador de Vuelo (FC)** \[cite: 28, 29\] | Procesamiento de señales de navegación y algoritmos de control PID4. | Microcontrolador central (MCU) que ejecuta firmware en tiempo real mediante lecturas de la unidad de medida inercial (IMU/Giroscopio)28. | En el centro geométrico de gravedad de la aeronave, fijado sobre amortiguadores de vibración (softmounts)15. |
| **Variador de Velocidad (ESC)** \[cite: 18, 24\] | Regulación de la velocidad rotacional y entrega de potencia trifásica a los motores16. | Modulación de ancho de pulso (PWM) de alta frecuencia aplicada a compuertas lógicas de MOSFETs para conmutar la corriente continua de la batería en alterna trifásica15. | En la base del bloque o pila central (*stack*), directamente debajo de la FC para reducir la longitud de los cables de potencia24. |
| **Motores Brushless** \[cite: 13, 18\] | Generación de empuje mecánico rotacional12. | Inducción electromagnética mediante bobinas estáticas trifásicas que interactúan con imanes permanentes de neodimio de alta resistencia térmica12. | En los extremos distales de cada brazo de carbono del chasis. |
| **Hélices** \[cite: 18\] | Conversión de la energía rotacional en sustentación y empuje aerodinámico. | Principio de Bernoulli y tercera ley de Newton aplicados a perfiles alares de rotación rápida. | Montadas sobre los ejes exteriores roscados o de fijación en T de los motores12. |
| **Receptor de Radio (RX)** \[cite: 19, 20\] | Recepción de tramas de comandos de control inalámbricos19. | Desmodulación de señales RF digitales en la banda de 2.4 GHz y envío de paquetes seriales bajo el protocolo de alta velocidad CRSF8. | Generalmente en la sección trasera de la cabina, con las antenas orientadas de forma perpendicular lejos del carbono8. |
| **Transmisor de Video (VTX)** \[cite: 26, 27\] | Transmisión aérea de la señal de imagen en tiempo real26. | Conversión de señales analógicas CVBS en ondas de radiofrecuencia moduladas en frecuencia en la banda de 5.8 GHz23. | En la parte trasera del chasis o en una pila de montaje secundaria4. Requiere buena ventilación26. |
| **Cámara FPV** \[cite: 6, 7\] | Captura visual en perspectiva frontal del piloto6. | Conversión fotónica a través de un sensor CMOS de barrido rápido con compensación de amplio rango dinámico (WDR) para transiciones rápidas de luz. | En la sección frontal extrema del chasis, suspendida en soportes basculantes de TPU para ajustar el ángulo de inclinación6. |
| **Módulo GPS** \[cite: 18, 24\] | Proporciona telemetría de posición, velocidad terrestre y retorno seguro de emergencia18. | Recepción multiconstelación de microondas satelitales procesadas bajo sentencias serie NMEA. | En un soporte de alta elevación en la sección trasera, minimizando la interferencia electromagnética de motores y VTX. |
| **Condensador Electrolítico** \[cite: 5, 25\] | Supresión de picos de voltaje inducidos y filtrado de ruido eléctrico de alta frecuencia24. | Almacenamiento capacitivo de respuesta rápida que absorbe los retornos inductivos generados por el frenado dinámico del ESC15. | Soldado directamente sobre los pads principales de entrada de tensión (![][image11] y ![][image12]) del variador24. |
| **Zumbador (Beeper)** \[cite: 24\] | Emisión de señales acústicas para localización y alertas de estado24. | Transductor piezoeléctrico activado por comandos lógicos de la controladora o mediante batería autónoma de respaldo en caso de desconexión de energía. | Fijado al chasis en un punto expuesto que no amortigüe la presión sonora. |

## **Procedimiento detallado de ensamblaje físico y conexiones**

El montaje físico de los componentes específicos del setup de 3.6 pulgadas debe ejecutarse con una precisión rigurosa, respetando los estándares de conductividad y aislamiento eléctrico requeridos para sistemas de alta vibración y altas corrientes de descarga14.

                 DIAGRAMA DE CONEXIÓN DE LA PLATAFORMA MANTA 3.6"

 \+---------------------------------------------------------------------------------+  
 |                                   CÁMARA CADDX                                  |  
 |   \[5V-24V\]---------------------+                                                |  
 |   \[GND\]---------------------+  |                                                |  
 |   \[VIDEO-OUT\]-------------+ |  |                                                |  
 \+---------------------------|-|--|------------------------------------------------+  
                             | |  |  
                             v v  v  
 \+---------------------------------------------------------------------------------+  
 |                       CONTROLADORA DE VUELO ARGUS MINI F7                       |  
 |                                                                                 |  
 |   \[VI\] \<------------------+ (Señal de Video de la Cámara)                       |  
 |   \[VO\] \-------------------+ (Señal con OSD hacia el VTX)                        |  
 |                                                                                 |  
 |   \[TX1\] \------------------+ (SmartAudio para control del VTX)                   |  
 |   \[5V\]  \------------------+ (Alimentación de la Cámara o VTX)                   |  
 |   \[GND\] \------------------+ (Tierra de Video / Común)                           |  
 |                                                                                 |  
 |   \[RX2\] \<-----------------+ (Señal TX del Receptor SuperD ELRS)                 |  
 |   \[TX2\] \------------------+ (Señal RX del Receptor SuperD ELRS)                 |  
 |   \[4V5\] \------------------+ (Alimentación constante USB/Lipo del RX)            |  
 |   \[GND\] \------------------+ (Tierra del Receptor)                               |  
 |                                                                                 |  
 |   \[RX3\] \<-----------------+ (Señal TX del Módulo GPS)                           |  
 |   \[TX3\] \------------------+ (Señal RX del Módulo GPS)                           |  
 |   \[5V\]  \------------------+ (Alimentación del GPS)                              |  
 |   \[GND\] \------------------+ (Tierra del GPS)                                    |  
 |                                                                                 |  
 |   \[SDA / SCL\] \<-----------+ (Bus I2C para Magnetómetro si está disponible)      |  
 |                                                                                 |  
 |   \+---------------------------------------------------------+                   |  
 |   |          PUERTO ARNES SH1.0 8-PINES (CONEXIÓN FC-ESC)    |                   |  
 |   |          (Señales de Motor M1-M4, Telemetría, GND, BAT) |                   |  
 |   \+---------------------------------------------------------+                   |  
 \+---------------------------------------|-----------------------------------------+  
                                         |  
                                         | Arnés SH1.0 8P (Plug-and-Play) \[cite: 24, 34\]  
                                         |  
 \+---------------------------------------v-----------------------------------------+  
 |                               VARIADOR ESC ARGUS                                |  
 |                                                                                 |  
 |      \[PADS MOTORES\] \<-----+ (3 cables por brazo hacia motores C206)             |  
 |                                                                                 |  
 |      \[BATERÍA \+\] \<--------+ (Entrada Principal Lipo 6S \- XT60)                  |  
 |      \[BATERÍA \-\] \<--------+ (Terminal de Tierra XT60)                           |  
 |                                                                                 |  
 |      \[CONDENSADOR\] \<------+ (Soldado en paralelo a los Pads de la Batería)      |  
 \+---------------------------------------------------------------------------------+

### **Paso 1: Preparación e integración del chasis AxisFlying Manta 3.6" Lite**

El chasis está construido con fibra de carbono T700 de grado aeronáutico, lo que le confiere una resistencia superior ante impactos dinámicos4.

* Se debe realizar el lijado fino de los bordes biselados de los brazos de carbono de 4 mm utilizando una lija al agua de grano 6004. Esto elimina microastillas conductoras de carbón que podrían inducir cortocircuitos si entran en contacto directo con los cables de alimentación expuestos.  
* Monte los cuatro brazos de 4 mm sobre la placa inferior de 3 mm empleando los pernos M3 de cabeza avellanada incluidos4.  
* Coloque la placa de presión intermedia y apriete los pernos aplicando fijador de roscas de resistencia media (Loctite 242\) en todas las uniones de metal con metal4.  
* Instale los separadores hexagonales de aluminio de 20 mm de altura para definir el espacio interno útil de la electrónica4.

### **Paso 2: Instalación de los motores AxisFlying C206 2750KV**

Los motores C206 2750KV están optimizados para baterías de 6S y hélices de 3.6 pulgadas, y presentan un patrón de anclaje de ![][image13] con roscas M24.

* Posicione cada motor sobre el extremo del brazo correspondiente.  
* Inserte los pernos de fijación de rosca M2. **Precaución mecánica**: Se debe verificar con absoluta precisión que la punta de los pernos de montaje no exceda el grosor del brazo de carbono (4 mm) y la base del motor, de manera que no toque las bobinas de cobre del estator4. Un perno excesivamente largo penetrará el aislamiento de esmalte de la bobina, provocando una derivación eléctrica a tierra a través del carbono conductivo, lo que destruiría el ESC al energizar el sistema24.  
* Lleve los cables de fase de los motores planos sobre el brazo de carbono, protegiéndolos con una sección de funda termorretráctil o cinta de alta fricción para prevenir cortes mecánicos causados por la rotación de las hélices ante impactos fortuitos.

### **Paso 3: Montaje e integración del Stack Argus Mini F7 (ESC \+ FC)**

El Stack Argus Mini presenta una configuración compacta con un patrón de montaje de ![][image14] que reduce el peso general28.

                     ESQUEMA DE MONTAJE FÍSICO DE LA PILA (STACK)

       \[ Tuerca de Seguridad M2/M3 \]  
                    |  
                    v  
       \+-------------------------+  
       |   FC Argus Mini F7      | \<--- Controladora de Vuelo (FC)  
       \+-------------------------+  
       |  Dampers de Silicona    | \<--- Amortiguación de vibraciones  
       \+-------------------------+  
       |   Arnés de Datos 8P     | \<--- Conexión entre FC y ESC (Plug-and-Play) \[cite: 24, 34\]  
       \+-------------------------+  
       |  Separador de Nylon     | \<--- Espacio de aislamiento térmico de 5-6 mm  
       \+-------------------------+  
       |   ESC Argus 40A/55A     | \<--- Variador de velocidad \[cite: 14, 37\]  
       \+-------------------------+  
       | Dampers/Separador Base  | \<--- Evita contacto directo con la fibra de carbono  
       \+-------------------------+  
       | Placa Inferior de Carbón| \<--- Base del chasis Manta 3.6"  
                    ^  
                    |  
       \[ Perno de Montaje M2/M3 \]

* **Instalación del Variador (ESC)**: Deslice los pernos de montaje de nylon o acero M2 a través de los orificios de la placa inferior de carbono4. Coloque arandelas y dampers aislantes de goma para suspender el ESC29. Coloque el ESC Argus Mini con la orientación estándar: los pads de entrada de tensión principal de la batería y la soldadura del cable XT60 deben quedar orientados hacia la parte posterior del chasis para optimizar el centro de gravedad24.  
* **Soldadura de Cables de Fase de Motores**: Recorte los cables de los motores a la longitud exacta para alcanzar los pads del ESC24. Pele 1.5 mm del aislante de silicona, pre-estañe los terminales empleando fundente y suéldelos a los pads marcados como M1, M2, M3 y M4 del ESC24. No altere el orden de los tres cables de fase de forma deliberada; cualquier cambio en el sentido de rotación requerido por la cinemática se configurará posteriormente mediante el firmware AM3224.  
* **Integración del Condensador**: Es mandatorio soldar el condensador electrolítico de baja ESR (![][image15], ![][image16]) provisto directamente sobre los pads principales de entrada positivo (![][image11]) y negativo (![][image12]) del ESC, respetando la polaridad marcada en el componente (franja gris con signos menos identifica el pin negativo)24. La longitud de las patas del condensador debe mantenerse al mínimo para maximizar la absorción de transitorios de voltaje inducidos por el frenado dinámico24.  
* **Montaje del Controlador de Vuelo (FC)**: Interconecte la FC Argus Mini F7 con el ESC mediante el cable plano SH1.0 de 8 pines provisto24. Monte la FC en la sección superior de la pila utilizando espaciadores que aseguren una separación mínima de 5 mm respecto al ESC para evitar interferencias térmicas e inducción electromagnética sobre el giroscopio de precisión15. Asegúrese de que la flecha serigrafiada en la FC apunte en el sentido de marcha de la aeronave31.

### **Paso 4: Soldadura del sistema analógico y periféricos**

* **Transmisor de Video (VTX) Rush Tank Ultimate Mini**: Conecte el cable de alimentación positiva de entrada del VTX directamente a un pad con salida de voltaje filtrado VBAT (voltaje directo de batería de la FC) y la tierra al pad GND adyacente26. Conecte el cable de señal de video de salida de la FC (Video Out / VO) al terminal de Video In del VTX25. Suelde el cable de protocolo SmartAudio del VTX al pad de transmisión física **TX1** de la FC26.  
* **Cámara FPV Caddx**: Alimente la cámara Caddx mediante la salida regulada de ![][image17] provista por el VTX (para un filtrado óptimo de ruido electromagnético de los motores) o desde el BEC de ![][image17] de la FC27. Suelde el cable de señal de video de salida de la cámara al pad de entrada de video (Video In / VI) de la FC25.  
* **Receptor BetaFPV SuperD ELRS 2.4G**: Conecte el pin de ![][image17] del receptor al terminal marcado como **4V5** o **5V** en la FC38. El uso del pin 4V5 permite que el receptor se encienda directamente cuando la FC se conecta a la PC por USB, posibilitando pruebas de enlace sin necesidad de alimentar la batería principal. Conecte GND a tierra38. Suelde el terminal TX del receptor al pin RX2 de la FC, y el terminal RX del receptor al pin TX2 de la FC38.  
* **Módulo GPS**: Suelde los terminales de alimentación del módulo a los pads GND y ![][image17] de la FC24. Conecte el pin TX del GPS al pad de recepción serial **RX3** de la controladora, y el pin RX del GPS al pad de transmisión serial **TX3**31. Si el GPS posee brújula física integrada, suelde los cables SDA y SCL a los pads correspondientes del bus I2C de la FC15.

## **Entornos de software para configuración y diagnóstico**

La etapa de programación y calibración requiere una serie de herramientas de software de libre acceso desarrolladas para gestionar los firmwares embebidos de cada componente.

### **1\. Betaflight Configurator**

Es la plataforma de código abierto por excelencia para la parametrización de controladores de vuelo multirrotor24. Permite interactuar con el firmware de la FC mediante una interfaz gráfica detallada. Sus funciones primarias engloban la calibración del acelerómetro, el mapeo de canales del receptor, la sintonización de los lazos de control PID, la configuración del filtrado de ruido del giroscopio y el diseño visual de la telemetría en pantalla (OSD)24.

### **2\. ExpressLRS Configurator**

Utilidad dedicada a la compilación y flasheo de transmisores y receptores que operan bajo el protocolo ExpressLRS39. Permite al usuario seleccionar el objetivo de hardware específico de fabricantes como BetaFPV, definir la tasa de refresco del enlace, seleccionar el dominio regulatorio de frecuencia permitido por la legislación y preconfigurar una frase de vinculación cifrada exclusiva de forma directa en el firmware39.

### **3\. AM32 ESC Configurator (esc-configurator.com)**

Es una herramienta basada en navegador web (que implementa la API Web Serial) diseñada específicamente para la gestión de variadores de velocidad que ejecutan el firmware AM32 de 32 bits15. Permite realizar la calibración fina de la conmutación de los motores, ajustar la frecuencia PWM de los controladores MOSFET para modificar la respuesta térmica y la suavidad del acelerador, y actualizar de forma segura el firmware del variador15.

### **4\. BETAFPV Configurator**

Software específico e institucional desarrollado por la marca BETAFPV para realizar la calibración física de los potenciómetros analógicos de los mandos de la serie LiteRadio40. Permite ajustar el centrado dinámico de los joysticks de control (gimbals), cambiar de modo de operación (Mode 1 / Mode 2), actualizar el cargador de arranque (bootloader) del microcontrolador STM32 interno de la emisora y reconfigurar los parámetros lógicos del módulo de transmisión RF integrado41.

## **Parámetros de configuración específicos y protocolo de vinculación**

La correcta correspondencia entre la configuración lógica del software y el conexionado de hardware físico garantiza el comportamiento predecible y eficiente de la aeronave en vuelo24.

### **Configuración del mapeo de puertos UART en Betaflight**

Es fundamental estructurar de forma precisa el direccionamiento lógico de los puertos en la pestaña **Puertos** (*Ports*) de Betaflight Configurator para asegurar la interoperabilidad de los periféricos instalados31:

| Identificador de Puerto | Entrada de Sensor (Sensor Input) | Entrada de Receptor (Serial Rx) | Periféricos (Peripherals) | Tasa de Baudios |
| :---- | :---- | :---- | :---- | :---- |
| **USB VCP** | Deshabilitado | Deshabilitado | Deshabilitado (Conexión Directa) | Automático |
| **UART 1** | Deshabilitado | Deshabilitado | **VTX (TBS SmartAudio)** \[cite: 26, 27\] | Automático |
| **UART 2** | Deshabilitado | **Habilitado** \[cite: 19, 20\] | Deshabilitado | 115200 |
| **UART 3** | **GPS** \[cite: 31, 34\] | Deshabilitado | Deshabilitado | 11520031 |
| **UART 4** | Deshabilitado | Deshabilitado | **ESC Telemetry** \[cite: 25, 34\] | 115200 |

### **Configuración de la pestaña de Configuración General**

En la sección **Configuración** (*Configuration*) de Betaflight, aplique las siguientes directrices operativas específicas para el hardware analizado:

* **Protocolo de ESC**: Seleccione **DSHOT300**30. La frecuencia de actualización reducida de DShot300 en comparación con DShot600 libera ciclos de CPU en el procesador F7, permitiendo ejecutar el bucle de PID a un ritmo constante de 4.00 kHz de manera sincronizada con el giroscopio sin inducir retrasos de procesamiento (*jitter*).  
* **DShot Bidireccional**: Habilite la casilla correspondiente para activar el retorno de datos RPM de los motores hacia la FC15. Configure el valor de polos del motor en **14** (el motor AxisFlying C206 de arquitectura ![][image18] presenta catorce imanes permanentes en su campana de rotación exterior)12. Esto permite calibrar el filtro notch dinámico por hardware para suprimir picos de vibración mecánica en tiempo real.  
* **Alineación del Giroscopio**: Asegúrese de que la orientación por defecto del sensor coincida con el sentido físico de montaje de la FC31. Si el puerto USB de la controladora fue montado apuntando hacia el lateral izquierdo por accesibilidad física, configure una rotación virtual del sensor de **Yaw: 90°** o **Yaw: 270°**31. Verifique en la pantalla principal que el modelo tridimensional del dron en Betaflight se mueva de manera idéntica y sincronizada con el movimiento manual del dron real.  
* **Configuración del Receptor**: Establezca el modo del receptor en **Serial (via UART)** y designe al proveedor del servicio serie como **CRSF**8. Configure el mapa de canales en formato **AETR1234** (Alerón, Elevador, Acelerador, Guiñada) para garantizar la compatibilidad directa con los comandos analógicos emitidos por la emisora de radio46.

### **Configuración del sensor de corriente (Escala del Amperímetro)**

Para garantizar la precisión de los datos de consumo de corriente en miliamperios-hora consumidos que se despliegan en el OSD de las gafas FPV, se debe calibrar el sensor físico en la pestaña de Energía y Batería de Betaflight31. El variador de velocidad del Stack Argus Mini de 55A posee un amplificador operacional de sensado de corriente calibrado de fábrica con una constante de escala nominal de **200**28.  
![][image19]

### **Configuración del receptor e interactividad con el transmisor LiteRadio 2**

Existe una incompatibilidad de software frecuente en el taller que impide establecer el enlace de control por radiofrecuencia de forma directa47. Los receptores de la serie BetaFPV SuperD ELRS de última generación se suministran de fábrica precargados con firmware ExpressLRS que ejecuta el protocolo mayor **V3.x.x**19.  
Por otro lado, los mandos de radio de la serie LiteRadio 2 SE a menudo se distribuyen con una versión de firmware obsoleta que procesa comandos bajo el protocolo ExpressLRS mayor **V2.x.x**41. Debido a que ExpressLRS presenta una ruptura de compatibilidad fundamental entre versiones mayores diferentes, la emisora no se enlazará con el receptor a menos que ambos dispositivos ejecuten la misma versión mayor47.

#### **Procedimiento para la actualización del firmware en la LiteRadio 2 SE a ELRS V3**

> 1. Descargue el software instalador oficial **BETAFPV Configurator V2.0.0-RC2** en su computadora41.  
> 2. Obtenga el archivo binario del firmware de control correspondiente a la emisora: LiteRadio\_2\_SE\_V2\_SX1280\_3.0.0\_2023\_11\_07.bin41.  
> 3. Con el mando de control completamente apagado y desvinculado de cables, pulse de manera continua el botón de configuración **SETUP** ubicado en la sección posterior de la carcasa43.  
> 4. Manteniendo presionado el botón SETUP, encienda la LiteRadio 243. El control emitirá una secuencia de tonos acústicos rápidos y el anillo LED del botón de alimentación brillará con un tono azul continuo, indicando que el microcontrolador STM32 ha accedido de forma segura al modo de cargador de arranque (DFU Bootloader)43.  
> 5. Conecte el mando a la computadora mediante un cable de interfaz de datos USB-C (evite cables que solo suministran carga)41.  
> 6. Abra la aplicación de configuración de BETAFPV, seleccione el puerto serie COM asignado virtualmente en el sistema y haga clic en **Conectar**43.  
> 7. En la pestaña de carga de firmware, acceda a la opción de búsqueda de archivos locales y seleccione el firmware .bin descargado previamente43.  
> 8. Presione el botón de ejecución **Write to TX** para transferir y grabar el firmware en la memoria flash de la emisora43. Una vez completada la barra al 100%, el mando operará con ExpressLRS V3.0.0 de forma nativa43.  
> 9. **Calibración obligatoria de gimbals**: Posterior a todo proceso de actualización de firmware, se debe proceder a la calibración de los ejes de las palancas en la pestaña de calibración del configurador, asegurando el posicionamiento neutro exacto (![][image20]) de cada canal41.

#### **Método de Vinculación Criptográfica mediante Frase de Emparejamiento (Recomendado)**

Este método es preferible por su conveniencia logística y seguridad operacional en talleres escolares, ya que evita colisiones de señal entre múltiples pilotos volando al mismo tiempo en la misma locación40.

> 1. Inicie la utilidad **ExpressLRS Configurator**, seleccione la categoría de hardware BETAFPV 2.4 GHz y designe el modelo de receptor como BETAFPV SuperD 2.4GHz RX39.  
> 2. En la sección de configuración de opciones adicionales, localice el campo de entrada de texto para la contraseña de enlace (**Binding Phrase**) y digite una clave alfanumérica única (por ejemplo, TALLER\_FPV\_CHILE\_2026)39.  
> 3. Genere la compilación del software y proceda al flasheo del receptor SuperD mediante la conexión directa del cable USB a la FC (método de comunicación *Passthrough*)39.  
> 4. Conecte el mando LiteRadio 2 SE a la utilidad de configuración de BETAFPV, navegue a la pestaña de parámetros RF de ExpressLRS y digite exactamente la misma contraseña cifrada (TALLER\_FPV\_CHILE\_2026)44.  
> 5. Al encender simultáneamente ambos dispositivos, la vinculación inalámbrica se establecerá instantáneamente, eliminando la necesidad de realizar procesos físicos de emparejamiento cada vez que se enciende el dron19.

#### **Método de Vinculación Física Tradicional por Ciclos de Encendido (Si no hay frase de emparejamiento)**

Si el receptor y la emisora operan bajo firmwares genéricos sin una frase de emparejamiento definida, aplique la siguiente secuencia física19:

> 1. Conecte una batería LiPo al conector XT60 del dron para energizar el receptor, déjelo encendido durante un segundo y desconecte el cable de manera inmediata8.  
> 2. Repita esta secuencia de encendido y apagado rápido por segunda vez51.  
> 3. Conecte la batería de alimentación por tercera vez51. El procesador interno ESP32-PICO-D4 del receptor SuperD interpretará estas tres interrupciones consecutivas de energía como una solicitud de emparejamiento por hardware19. El indicador LED RGB integrado en el receptor comenzará a emitir un parpadeo doble rápido de color naranja19.  
> 4. Encienda la emisora LiteRadio 2 SE46.  
> 5. Oprima firmemente el botón físico de emparejamiento **BIND** situado en la parte trasera del mando40.  
> 6. El LED RGB del receptor SuperD cambiará a un estado de iluminación verde sólida continua, confirmando la sincronización de los lazos de fase del receptor con la emisora8.

## **Marco regulatorio chileno para operaciones recreativas y educativas (DGAC)**

La operación de drones (denominados técnicamente por la autoridad aeronáutica como Aeronaves Pilotadas a Distancia o RPAS) en la República de Chile está estrictamente fiscalizada y regulada por la Dirección General de Aeronáutica Civil (DGAC)1. El marco regulatorio se rige de manera principal por dos normas de carácter aeronáutico (DAN) cuya aplicación obligatoria depende directamente del entorno geográfico donde se desplace el vehículo2.

### **Norma DAN 91: Reglas del Aire (Operaciones en Áreas No Pobladas)**

La norma DAN 91 se aplica de manera general para operaciones aéreas que tienen lugar fuera de zonas urbanas, campos abiertos, desiertos, cerros o áreas rurales despobladas2. Aunque el riesgo operacional ante colisiones es significativamente menor en estos entornos, la ley exige cumplir de manera irrestricta con las siguientes condiciones fundamentales9:

* **Operación a la vista (VLOS)**: El piloto al mando debe mantener contacto visual directo, natural y constante con la aeronave en todo momento9. No está permitido el uso exclusivo de las gafas FPV para el pilotaje de seguridad si no se cuenta con un observador visual de apoyo directo que monitorice el espacio aéreo contiguo para prevenir colisiones con aeronaves tripuladas que vuelen a baja altura.  
* **Techo Máximo de Vuelo**: Se prohíbe desplazar la aeronave a una altitud que supere los 400 pies (aproximadamente 120 metros) sobre el terreno donde se origina la operación10.  
* **Seguridad de Terceros**: El operador asume la responsabilidad civil por cualquier daño material a propiedades o lesiones físicas causadas a personas debido a fallas mecánicas, errores de pilotaje o pérdida de control de la aeronave9.

### **Norma DAN 151: Operaciones de RPAS sobre Áreas Pobladas**

Si el taller de drones planifica realizar vuelos de prueba dentro del patio de una institución de educación media, parques urbanos públicos, zonas residenciales o calles céntricas de comunas chilenas, la operación aérea se sitúa estrictamente bajo la estricta regulación de la norma DAN 1519. Esta normativa es altamente exigente en materia de control administrativo y técnico, obligando a cumplir con las siguientes pautas de control aeronáutico9:

> 1. **Obligación de Registro de la Aeronave**: Todo propietario que opere un dron de peso inferior a 9 kg sobre áreas pobladas tiene la obligación legal de inscribirlo de manera previa ante el registro de aeronaves de la DGAC1. Al registrarlo, se le asigna un número de matrícula único que debe ser grabado físicamente sobre la estructura de fibra de carbono del chasis para facilitar su identificación visual1.  
> 2. **Obtención de la Credencial de Piloto**: Los operadores deben contar con una licencia o credencial de operador de RPA emitida por la DGAC1. Para optar a esta credencial, el postulante debe cumplir con los siguientes requisitos reglamentarios55:  
   * Ser mayor de 18 años de edad55.  
   * Presentar una declaración jurada notarial que certifique haber recibido instrucción teórica y práctica detallada sobre el modelo exacto de RPAS que va a pilotar en la zona urbana1.  
   * Rendir y aprobar con una calificación de corte igual o superior al 75% un examen teórico escrito presencial en las dependencias de la DGAC10. Las materias a evaluar engloban regulaciones aeronáuticas (DAN 91, DAN 151, DAN 137), nociones de aerodinámica básica, interpretación de reportes meteorológicos estándar (METAR/TAF) y reglamentos generales del aire10.  
   * Esta credencial posee una vigencia legal de 36 meses10.  
> 3. **Contratación de un Seguro de Responsabilidad Civil**: Es un requisito mandatorio para toda operación aérea urbana bajo la DAN 151 contar con una póliza de seguro vigente que garantice la cobertura total de daños a terceros en el terreno en caso de un siniestro imprevisto2.  
> 4. **Restricciones de Distancia y Sobrevuelo**: Se prohíbe de manera categórica sobrevolar propiedades privadas o predios habitados sin contar previamente con el consentimiento expreso de sus propietarios o administradores legales10. Adicionalmente, el dron no puede operar a una distancia horizontal inferior a 30 metros de cualquier persona que sea ajena a la operación de vuelo directa de la aeronave10.

## **Recomendaciones operativas de seguridad para el taller escolar**

El entorno de aprendizaje de educación media técnica requiere la implementación de protocolos estrictos de control de riesgos y buenas prácticas para evitar accidentes mecánicos y fallas en los componentes electrónicos del dron de 3.6 pulgadas2.

* **Aislamiento Eléctrico de Fibra de Carbono**: La fibra de carbono que compone la estructura del chasis Manta 3.6" es un excelente conductor de la electricidad. Es fundamental asegurar que ningún cable de fase de los motores C206 o de alimentación de la batería tenga su aislamiento de silicona dañado, y que ningún punto de soldadura en la FC o el ESC haga contacto directo con el chasis, ya que esto provocaría un cortocircuito masivo que destruiría el hardware del stack de forma instantánea24.  
* **Fijación de Tornillería**: Los motores FPV giran a altas velocidades (hasta 70,000 RPM a pleno voltaje), induciendo vibraciones mecánicas continuas sobre la estructura del chasis. El uso de un fijador de roscas anaeróbico de fuerza media (Loctite 242\) es un requisito mandatorio en cada perno de metal que se acople sobre piezas o espaciadores de aluminio para prevenir el aflojamiento estructural progresivo durante el vuelo4.  
* **Gestión Térmica del Transmisor de Video (VTX)**: El transmisor analógico Rush Tank Ultimate Mini disipa una gran cantidad de calor cuando opera a niveles de potencia de 500 mW u 800 mW27. Durante las pruebas estáticas en el banco de trabajo del taller, es fundamental mantener el VTX configurado en modo foso (Pitmode a 0.1 mW) para evitar daños permanentes por sobrecalentamiento térmico26. Asimismo, se recomienda usar un ventilador externo que fuerce un flujo de aire constante sobre las aletas de disipación de calor de la pila central de la aeronave mientras se realiza la configuración en la PC26.  
* **Remoción Obligatoria de Hélices**: Bajo ninguna circunstancia se deben colocar las hélices Gemfan de 3.6" sobre los motores del dron mientras la aeronave se encuentre conectada a la PC mediante USB o se realicen pruebas dinámicas de rotación de motores en el software de configuración24. Un giro inesperado de los motores a altas revoluciones debido a una mala configuración de software puede causar accidentes y lesiones graves por cortes profundos en manos y rostro de los estudiantes del taller2.  
* **Pruebas de Vuelo de Interiores Seguras**: Si se deciden realizar vuelos de demostración o pruebas dinámicas iniciales de sustentación dentro de la sala de clases o el taller, la norma DAN 151 exige de forma prioritaria la instalación de mallas o redes físicas perimetrales de protección alrededor del perímetro del área designada para el vuelo10. Esto evita que la aeronave impacte directamente contra los estudiantes en caso de fallas en el giroscopio o pérdida del enlace de control, garantizando un entorno educativo controlado y seguro para el aprendizaje de las tecnologías de robótica aérea9.

#### **Fuentes citadas**

> 1. DAN 151 \- DGAC, [https://www.dgac.gob.cl/wp-content/uploads/2023/08/DAN-151-ED.2-ENM-1.pdf](https://www.dgac.gob.cl/wp-content/uploads/2023/08/DAN-151-ED.2-ENM-1.pdf)  
> 2. Drones: ¿Juguetes? \- SERNAC, [https://www.sernac.cl/portal/619/articles-4557\_archivo\_01.pdf](https://www.sernac.cl/portal/619/articles-4557_archivo_01.pdf)  
> 3. How To Bind Betafpv Lite 2 And Mobula6 Frsky D8 Version | Step By Step \- YouTube, [https://www.youtube.com/watch?v=3YqxDOYv5Bc](https://www.youtube.com/watch?v=3YqxDOYv5Bc)  
> 4. Manta 3,6 Axisflying Análogo VTX \- SOLUDRONES, [https://www.soludrones.cl/manta-36-axisflying](https://www.soludrones.cl/manta-36-axisflying)  
> 5. Axisflying Argus Mini F722 Pro 55A Stack \- Unmanned Tech, [https://www.unmannedtechshop.co.uk/products/axisflying-argus-mini-f722-pro-55a-stack](https://www.unmannedtechshop.co.uk/products/axisflying-argus-mini-f722-pro-55a-stack)  
> 6. Axisflying Manta 3.6'' / 3.6inch FPV Frame / Squashed X / With side plate Manta 3.6, [https://robu.in/product/axisflying-manta-3-6-3-6inch-fpv-frame-squashed-x-with-side-plate-manta-3-6/](https://robu.in/product/axisflying-manta-3-6-3-6inch-fpv-frame-squashed-x-with-side-plate-manta-3-6/)  
> 7. Axisflying Manta 3.6 / 3.6inch FPV Frame / Squashed X / With side plate Manta 3.6, [https://www.electropi.in/axisflying-manta-36-36inch-fpv-frame-squashed-x-with-side-plate-manta-36](https://www.electropi.in/axisflying-manta-36-36inch-fpv-frame-squashed-x-with-side-plate-manta-36)  
> 8. BETAFPV SuperD ELRS 2.4G Diversity Receiver \- 1dronas.lt, [https://1dronas.lt/en/produktas/betafpv-superd-elrs-2-4g-diversity-receiver/](https://1dronas.lt/en/produktas/betafpv-superd-elrs-2-4g-diversity-receiver/)  
> 9. ¿Existe el "Vuelo Recreativo" de Drones en Chile? Entendiendo la Normativa DAN 91 y DAN 151 \- Aerotest Chile, [https://aerotest.cl/blog/test/existe-el-vuelo-recreativo-de-drones-en-chile-entendiendo-la-normativa-dan-91-y-dan-151](https://aerotest.cl/blog/test/existe-el-vuelo-recreativo-de-drones-en-chile-entendiendo-la-normativa-dan-91-y-dan-151)  
> 10. OPERACIONES DE AERONAVES PILOTADAS A DISTANCIA (RPAS) SOBRE ÁREAS POBLADAS \- DGAC, [https://www.dgac.gob.cl/wp-content/uploads/2024/05/DAN-151-ED3-27MAY2024.pdf](https://www.dgac.gob.cl/wp-content/uploads/2024/05/DAN-151-ED3-27MAY2024.pdf)  
> 11. Motor sin escobillas Axisflying C206 2750KV, piezas RC 4S para, [https://es.aliexpress.com/item/1005011749428022.html](https://es.aliexpress.com/item/1005011749428022.html)  
> 12. Axisflying C206 Motor \- Edinburgh Drone Company, [https://www.edinburghdronecompany.co.uk/product/axisflying-c206-motor/](https://www.edinburghdronecompany.co.uk/product/axisflying-c206-motor/)  
> 13. Axisflying C206 2006 2500Kv \- Rotorama, [https://www.rotorama.com/product/axisflying-c206-2006-2500kv](https://www.rotorama.com/product/axisflying-c206-2006-2500kv)  
> 14. Axisflying Argus Mini Stack \- F7 FC \+ 55A 4-6S ESC \- 20x20 \- GetFPV, [https://www.getfpv.com/axisflying-argus-mini-stack-f7-fc-55a-4-6s-esc-20x20.html](https://www.getfpv.com/axisflying-argus-mini-stack-f7-fc-55a-4-6s-esc-20x20.html)  
> 15. Axisflying Argus F7 \+ 55A Mini AM32 \- Rotorama, [https://www.rotorama.com/product/axisflying-argus-mini-55a-stack](https://www.rotorama.com/product/axisflying-argus-mini-55a-stack)  
> 16. Axisflying Argus Mini 55A stack F7 Pro FC 55A 40A ESC 32 BIT 4-6s for FPV 5inch freestyle RC drone accessories \- AliExpress, [https://www.aliexpress.com/item/1005011672609817.html](https://www.aliexpress.com/item/1005011672609817.html)  
> 17. Manta 3.6inch Professional Freestyle FPV Drone With GPS HD Camera \- Axisflying, [https://www.axisflying.com/products/manta-36-36inch-fpv-drone-bnf-analog-walksnail-hd-pro-kit-gps-freestyle-cinematic](https://www.axisflying.com/products/manta-36-36inch-fpv-drone-bnf-analog-walksnail-hd-pro-kit-gps-freestyle-cinematic)  
> 18. Axisflying Argus Mini F7 STACK 40A ESC Flight Controller For Drones \- Indian Robo Store, [https://indianrobostore.com/product/axisflying-argus-mini-f7-stack-40a-esc-flight-controller-for-drones](https://indianrobostore.com/product/axisflying-argus-mini-f7-stack-40a-esc-flight-controller-for-drones)  
> 19. BETAFPV SuperD ELRS 2.4GHz Diversity Receiver \- GetFPV, [https://www.getfpv.com/betafpv-superd-elrs-2-4ghz-diversity-receiver.html](https://www.getfpv.com/betafpv-superd-elrs-2-4ghz-diversity-receiver.html)  
> 20. SuperD-ELRS-diversity-RX-User-Manual.pdf \- FPVFlow, [https://fpvflow.it/wp-content/uploads/2023/11/SuperD-ELRS-diversity-RX-User-Manual.pdf](https://fpvflow.it/wp-content/uploads/2023/11/SuperD-ELRS-diversity-RX-User-Manual.pdf)  
> 21. SuperD ELRS Diversity Receiver \- BETAFPV, [https://betafpv.com/products/superd-elrs-2-4g-diversity-receiver](https://betafpv.com/products/superd-elrs-2-4g-diversity-receiver)  
> 22. Axisflying Manta 3.6" Analogue BNF (TBS/ELRS) | Your FPV Drones, Buy Online, UK, [https://yourfpv.co.uk/product/axisflying-manta-3-6-analogue-bnf-tbs-elrs/](https://yourfpv.co.uk/product/axisflying-manta-3-6-analogue-bnf-tbs-elrs/)  
> 23. Rush Tank Ultimate Mini VTX \- Best Mini Video Transmitter \- YouTube, [https://www.youtube.com/watch?v=kso-DQT4R3Q](https://www.youtube.com/watch?v=kso-DQT4R3Q)  
> 24. Axisflying F7 Flight Controller Stack User Manual, [https://manuals.plus/asin/B0C49QP693](https://manuals.plus/asin/B0C49QP693)  
> 25. Borg Mini F7 FC Wiring Diagram en 20250926 | PDF | Computer Science \- Scribd, [https://www.scribd.com/document/1020015751/Borg-Mini-F7-FC-Wiring-Diagram-en-20250926](https://www.scribd.com/document/1020015751/Borg-Mini-F7-FC-Wiring-Diagram-en-20250926)  
> 26. FPV RACING TANK SOLO 5.8GHz VTX \- RUSH USER MANUAL, [https://distributions.com.ua/files/Istrukciya\_RUSH-DA14\_Pryami\_dysstrybucii.pdf](https://distributions.com.ua/files/Istrukciya_RUSH-DA14_Pryami_dysstrybucii.pdf)  
> 27. Rush Tank II Ultimate manual.pdf \- Colin's Radio Control, [https://colinsradiocontrol.com/images/Manuals/Rush%20Tank%20II%20Ultimate%20manual.pdf](https://colinsradiocontrol.com/images/Manuals/Rush%20Tank%20II%20Ultimate%20manual.pdf)  
> 28. AxisFlying Argus Mini F7 Flight Controller Stack w/ 55A 4-6S AM32 4in1 ESC \- Pyrodrone, [https://pyrodrone.com/products/axisflying-argus-mini-f7-flight-controller-stack-w-55a-4-6s-blheli32-4in1-esc-20x20mm](https://pyrodrone.com/products/axisflying-argus-mini-f7-flight-controller-stack-w-55a-4-6s-blheli32-4in1-esc-20x20mm)  
> 29. Axisflying Argus Mini 55A FPV FC/ESC Stack (F7 Pro FC \+ 32‑bit 55A 4‑i \- RCDrone, [https://rcdrone.top/products/axisflying-argus-mini-4-6s-55a-stack-f7-pro-fc-55a-esc-32-bit-for-fpv-5inch](https://rcdrone.top/products/axisflying-argus-mini-4-6s-55a-stack-f7-pro-fc-55a-esc-32-bit-for-fpv-5inch)  
> 30. HAKRC F405 Stack F4 V2 FC Dual BEC Flight Controller With 32bit 60A/65A 8bit 45A/50A 4in1 Brushless ESC For RC FPV Racing Drone \- AliExpress, [https://www.aliexpress.com/item/1005009183780812.html](https://www.aliexpress.com/item/1005009183780812.html)  
> 31. Axisflying Argus Pro Plug and Play Stack 65A & F7 Pro ESC and FC Manual \- device.report, [https://device.report/manuals/axisflying-argus-pro-65a-f7-esc-fc-manual](https://device.report/manuals/axisflying-argus-pro-65a-f7-esc-fc-manual)  
> 32. BETA FPV SuperP 14CH PWM Diversity Receiver ELRS 2.4G/915MHz User Manual, [https://manuals.plus/asin/B0DDT4XQJ5](https://manuals.plus/asin/B0DDT4XQJ5)  
> 33. TANK ULTIMATE MINI II VTX \- RUSHFPV, [https://rushfpv.net/products/tank-ultimate-mini-vtx](https://rushfpv.net/products/tank-ultimate-mini-vtx)  
> 34. AXIS FLYING Argus F7Pro 65A Stack Flight Controller Instruction Manual \- Manuals+, [https://manuals.plus/axis-flying/argus-f7pro-65a-stack-flight-controller-manual](https://manuals.plus/axis-flying/argus-f7pro-65a-stack-flight-controller-manual)  
> 35. Axisflying Manta 3.6" Frame Kit \- Squashed X \- GetFPV, [https://www.getfpv.com/axisflying-manta-3-6-frame-kit-squashed-x.html](https://www.getfpv.com/axisflying-manta-3-6-frame-kit-squashed-x.html)  
> 36. Axisflying Argus Mini F7 STACK 40A ESC \- Electropi.in, [https://www.electropi.in/axisflying-argus-mini-f7-stack-40a-esc](https://www.electropi.in/axisflying-argus-mini-f7-stack-40a-esc)  
> 37. Receiver Wiring \- ExpressLRS, [https://www.expresslrs.org/quick-start/receivers/wiring-up/](https://www.expresslrs.org/quick-start/receivers/wiring-up/)  
> 38. BetaFPV SuperD 2.4GHz \- ExpressLRS, [https://www.expresslrs.org/quick-start/receivers/betafpv-superd/](https://www.expresslrs.org/quick-start/receivers/betafpv-superd/)  
> 39. How to bind BetaFPV LiteRadio ELRS \- YouTube, [https://www.youtube.com/watch?v=3rdvve-Ecuc](https://www.youtube.com/watch?v=3rdvve-Ecuc)  
> 40. How to Update ELRS V2 to ELRS V3 \- BETAFPV Support, [https://support.betafpv.com/hc/en-us/articles/22404447195673-How-to-Update-ELRS-V2-to-ELRS-V3](https://support.betafpv.com/hc/en-us/articles/22404447195673-How-to-Update-ELRS-V2-to-ELRS-V3)  
> 41. BetaFPV LiteRadio 3 RC Transmitter Mode 2 \- FRSKY D8/D16/S-FHSS \- Pyrodrone, [https://pyrodrone.com/products/betafpv-literadio-3-rc-transmitter-mode-2-frsky-d8-d16-s-fhss](https://pyrodrone.com/products/betafpv-literadio-3-rc-transmitter-mode-2-frsky-d8-d16-s-fhss)  
> 42. How to Flash Firmware of LiteRadio 2 SE \- BETAFPV Support, [https://support.betafpv.com/hc/en-us/articles/900005322963/comments/34747094763417](https://support.betafpv.com/hc/en-us/articles/900005322963/comments/34747094763417)  
> 43. BETAFPV LiteRadio 2 SE ELRS Firmware Update Tutorial \- YouTube, [https://www.youtube.com/watch?v=5fa6TkXN0IM](https://www.youtube.com/watch?v=5fa6TkXN0IM)  
> 44. Axisflying Argus Mini 55A Stack F7 Flight Controller \- AliExpress, [https://www.aliexpress.com/item/1005007277934447.html](https://www.aliexpress.com/item/1005007277934447.html)  
> 45. Not showing up in beta flight \- Unmanned Tech \- DroneTrest, [https://www.dronetrest.com/t/not-showing-up-in-beta-flight/10936](https://www.dronetrest.com/t/not-showing-up-in-beta-flight/10936)  
> 46. How to bind Elrs to Betafpv : r/fpv \- Reddit, [https://www.reddit.com/r/fpv/comments/166q78e/how\_to\_bind\_elrs\_to\_betafpv/](https://www.reddit.com/r/fpv/comments/166q78e/how_to_bind_elrs_to_betafpv/)  
> 47. How to Bind with External ExpressLRS Receiver \- BETAFPV Support, [https://support.betafpv.com/hc/en-us/articles/4403734844441-How-to-Bind-with-External-ExpressLRS-Receiver](https://support.betafpv.com/hc/en-us/articles/4403734844441-How-to-Bind-with-External-ExpressLRS-Receiver)  
> 48. SuperD ELRS 2.4G Diversity Receiver \- Flying Robot, [https://flyingrobot.co/products/superd-elrs-2-4g-diversity-receiver](https://flyingrobot.co/products/superd-elrs-2-4g-diversity-receiver)  
> 49. BetaFPV LiteRadio 2 SE ELRS Review \- Brushless Whoop, [https://brushlesswhoop.com/betafpv-literadio-2-se-elrs-review/](https://brushlesswhoop.com/betafpv-literadio-2-se-elrs-review/)  
> 50. Binding ExpressLRS, [https://www.expresslrs.org/quick-start/binding/](https://www.expresslrs.org/quick-start/binding/)  
> 51. How to Bind ExpressLRS Receivers \- Step by Step Guide for Beginners \- Oscar Liang, [https://oscarliang.com/bind-expresslrs-receivers/](https://oscarliang.com/bind-expresslrs-receivers/)  
> 52. BETAFPV SuperD ELRS Diversity Receiver 2.4G 915MHz \- AliExpress, [https://www.aliexpress.com/item/1005004971634238.html](https://www.aliexpress.com/item/1005004971634238.html)  
> 53. Normativas DGAC \- Drones en Chile \- DAN 151 \- DAN 91, [https://vuelatudrone.cl/](https://vuelatudrone.cl/)  
> 54. ¿CÓMO OPERAR UN DRON EN CHILE? – DGAC | Dirección General de Aeronáutica Civil, [https://www.dgac.gob.cl/como-operar-un-dron-en-chile-2/](https://www.dgac.gob.cl/como-operar-un-dron-en-chile-2/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAZCAYAAADNAiUZAAABfUlEQVR4Xu2UvytGURjHv0IRkRQZRDY2iVKMJrEghSwWm5IM/gPKZpAysCCjTAx3VPwJFAaSMFkY+D6e5/ae93Tv7bxvDOp+6tN7zvOee557z48HyPmHVNA6PxjCgtevpq3QCV0aaYO15b9ZGtEdOmqxIDrpnhdro3f0iR5BJ72lr7TXxozQVVpp/WU6aO1MpukzkpNe0i1owg3o17us0S6n3w1NnEkHPacrSE4a2W8aw3QJhSWVhBJLRd56m87RMZSXNN7TU+hqTFkslQm6D02elVSWbwY6aQ+SJ5U9bfKDPlV00emnJb2iA05snX5BV6dkxmmt009KmoSMk6QX0KsTTAs982KhSYfoJ32BntRgJMEHvXeUuxfHDqHVRa7KA/QuxvTRd1PawdRA98t1nh5buxl6WKQwyFJu6mM/xMv7iOL7WTJyeuVQnaC4fkrswItJsXhDoSKVheyjvLlrROuhLyOn9Ybu2thr2i8P/jXtdBJaBPwymJOT8/t8A43MSLJrmsYfAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAZCAYAAADNAiUZAAABl0lEQVR4Xu2VvytGURjHH4kSBpHIgiwmSkhREpYXJSllsJmUGBSr/0AyKMlktdhvKYuVicFbopRFGMiP79dzrnvucbj3VZS63/rUe77nPOc59zk/XpFM/1BFoNw1XXFQseMxqNrxKI6tBT3yOYZ90yAAmyBnPK8qwB3YEx28BR7BmD0IagSH4Fh03Clot/qHwJJEi1kUXZxXTMpJyBoYjXe/aw68gEHLawU3YF30i1ZAs9PPxF4xaYdrOgpEE3CiUPUgD05ADegD8xKVlAnpeZUm6ZVoAiYKxbgA3IvGh3u6L1q1SeN5xeAu0Y3fEC2xe0g48VdJXyW+JYytstpeMXjC8TjRqkQrZTtt0h+LX3YBmkz7T5JyD+3TWkh5E8XyLYBZx2cCezLfQaoEB+ABdFp+osLV8mEotXx+2RPoNe0jcAvaPkZEV+YcNFh+KvElqbPaZeBZ4i9SC7gE26DEeMuii+sOBxUilpiHZkf0CTwDI8a3NQCuwS6YEi3rt3cxSXzcx0Uvd3+8Kyb+EQyDGfM7U6ZMv6s3H4ZRhT8VWVwAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAACQklEQVR4Xu2VTaiNURSGX/mJKIX8FLkJpcRAksLIwETERCmGZgYGxFQGBv5uJkQyEFFmChmcTAyUKGWAgQEzmaAkP+/T+vY563zn5x66jL63ns7da6/77bXXWntvqVGjSdcMM71u7KcpZr5ZYhaaqd3TPZpjVmnwx2eatQq/uhabO+Zmxbzu6V49M0/NVfPOfFX/APnwXfPZtMxzszzN8z+HzUdFAPyeVmcTs8wFxcaKTplpadylneaTYqdF180jMzvZHprXZlk1xueXuafIFHpVG6Nxdb6/xhxJc+iEWVGztbXdfDObk42FW+ouy0/FQkWrzVmzLtkINvugY5X9kCKDZHIszefM9oh+W5nGpP6+OZNspJ0F9iRbP+FDMFlUBjsbRrTGLXNN0XOMR9ZWRSZzLy0y380Oc858UHx4afJBw4Jr1exUJZd/oDgxu8x+RdZeKDJatEGxwMVk36IImCDJLIv9SXB/Jep/2xxVJ5ASXC4rti+KE0mjc3j+eXCIIPIhWa84EByeIu5Erh0WJgA06cGxyIKarWSqHHt6jrtvY9tj9ODYKPYbNfuE4lWgv+p3E0HkhcppLUEgSklJ6Tv6D+Fzpe0RKldJPegJRU+dV/eNXXrucvV30Uvz2MytxsfND7O37SGdVPThpmo8Zt4qro2Bd9kwsRg3+CVFGZ8odsp9l0WmeAEIkludMh9Q96nmUBDIe8Uz9sY80Ajv5zDxJO02BxWlo9z9xO63KfwG+RAsr8e+6jcH36hRo0b/U78B9At5mUZfbIUAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAZCAYAAACRiGY9AAACq0lEQVR4Xu2WTYhOURjHnwmlyHeGfG4ssKAkkSjZKF9JIcrSxoqFjYWNZmGDhYVospCSyEI20mQlFjakRFE2kkRRyMf/13POveeemfe+M66ZTN1//Xrfc85zPp7znPucY9aqVaux0KK8ItMMsUxMyhsSzRfrw++ErC2K/ovFBvMxR0W94oz4njcEzRM3xTtxW3wQR23woteKAXFRPDG3354aSD3m/QfEZfFCLE3aG4tFsVNTzSf5XWl17TevP5jUTRZ3xNtQZqH94kJh4ZooboRfNF08FDMLC9cvcSqra6w6p1j8D7Exqz9vpX3sf6toLXVFTAn/t5o7EJ2MInKPbbCzjVTn1BvxRazJ6k9YaR8jQnlaYWE2WzxKymmfVMzxWawKZSJPX04Emmt/8e3VOYVDdU7FiXeKn+KTOGC+61fF3dCOiNpQc+AUESSScVzgu71ufswZ+7nYHPp0VROn6BtFlFhcXBScTNrrnKJ+RyhHuz2FhetQqCdyXfUvnFotXptHjkgRsehY/IZG6lQsRy00jxqnoquaOsXOPTXPgFEsgGsAG+4t1NSpuE7m7qo6p4aTKEj732xwhuTK6BNHQrkuUaRzjLpT96z8iFNdstKeSTgWRCcXC41ObTPvE5NLFJnvmZgTyp2cWmB+xId1/JaYvwAYKH8CsVCyzgPzyxOtM9/Zs6FMPc7zOkg1S9y36pjHxb6kTNt7sTKpi04xHmtDy8Ur8TEadRIRovNQpLtEEnhpfuccMx+438pLFfGUwrFr5gsnnRMBnl+pcOKrOG1+bHl2balYlE5xdHmBYENKZ/4ViV1jsZhNYq91fvj2iN3isPmm9FabC9GfcXh6MWau9PgxJo/jEV++/5s6fVPjViSTeMdxTZyrNo9PkRA4mpFd1eZWrVqNlf4Asi+/yCq0+HEAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAZCAYAAABHLbxYAAACTElEQVR4Xu2WT6hNURTGP6HI/z8pIROUgYR4A2QiUUykFOaMKSJTZWD0MpAYeKM3eJn5UwzEgAyFJOqRFEVRTPz9vtZenWW9e+557r3qqfvVr+7ee519vr3X2vtcoK++/g/NJQtyZ42mkpVkC5mUxqIUtx42d8+0lvwib8nrxCOypsTtJu/IG/KRvCDbyphL5hX3gVwmo2SYzAkxHesw2VfYQZaSzeQZWVdippMbZFVpS+dhC7xZxoV+PyELQ5zm/xnaHetM7qCukf2hvRhm6kro21v6tHuryQbyBfbstBC3p8R1rQOprfRdgNWZS7ullx0LfW5A5mTyYGnHxUi+gJmhbzKqXdeitBFxcePSAFmUO6lZqa2UytgoWUJOlHadUZnxGF/gfVjNv4eVx+zyTKOOkJe5s0aa+DaqgyKDTUYl7ewd8tUDijxr8tBWeuEDMpIHWmgT7HDF03wJf2dUfVl6XoufkQeidsJ26VQeSFpOnmPsZONJvdRk9BWq2JYahAUezQNB2sFb5FxpT4FdZfNRf5g2wtLsNd6VUU1yDxao09xKqqGL5CTs1ErzyFXY3auv1TeMTZ3fDv4lazKan/9D+jp9Rr1RvcRPa0Y1rZ2VDpEfqO5gZeBuweVG9awb0vzHyfUyXitd2Lq49fCuNCb5hd8KlYxLd+9p8glWCg/JY7IixMRT/xRWKsrmd1jW2kor2kq2o0prN1oGM6qDlOeLqdeY7uyOLvx/rXY1OmGkshqCmVTZnEWP/wr2SjoL/k9NyHhjXfbV10TXb5Hlk8WQURekAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAZCAYAAAChBHccAAACIElEQVR4Xu2VTShmURjHn2kok698RBaIUMrCxkhREsXCx8JiyoKyxcIUsbKZLCYlO18LKxtbkiyEKEqUotmNlGxYUTb4/525HM97P8fS/dVv8f7vfc+555znnCMSE/N5+QJzYAHMU8/86Ic1OgxgCM4pJ2Gq9c6Yes7/eHIED+Ei/AsH4Nd3byTCzjbhE7yBFy66UQt/wD14BwdhI0xS78yLaZsfzt+utMNbWGVl/BM/zJ4NTSU8gH2wG5aLWbkiuA5/vr7pTqaYfmb0g39wgGs61DTDB1hnZWx0C6ZZmaZezOyw5Gz40VzBZJW7wX7OYL7KuQrLYirAF3ZeZv3+JqbRKStzoxq2qew73IXFKveCZfMIW1XOVT2GpSoPpAH+kfAf4MAy2IAt+oEPLC9OFGfZrnnOuM48yYadsEdMg02SWA5BXMMOHQZQAi/FDIB9E5Yv95IupVCwVtnYiEQbwJVEX2anttkfJ41MiPcmDgUb05vYD87SDkzXD0LAemfd88TLEnNQhO335XjLVRk3EgcwrHIveGIFHa1ecOA8cdgfB7ItZv8Ewlv1BK7CFCu/F9PYqJX5MQ6XdBiBX/K2cQOPRwfW9LSYC8bBqXley/ZZzYzyUrNxbtqPfDzvky24IiFPGAcuEettVkyZ7MPfYs57m1N4DitUzhXjyi2oPCqccd6qkSmEXbBXEmc2DLwTMnQYER7X/7NnYmJiYmLceQYtZGYAGf/VOwAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAZCAYAAAChBHccAAACCElEQVR4Xu2WTShtURTHl3qKHvmMRHkUpQyUgZ7ewOApEwYMKDIxMcBIiZGJzI3EyJsQb6aknsENGRi9wRMZykR6jEzIx//f3ifbsu85252p86tf3bPOvueuvfba+1yRlJSUiDEdSKAUNsECfcPDFFxRLsKvzphZdZ/fCeIbXNPBLJTDTXgNH+EzXJK3iWg64BA8gndwEnbBL2rMqpjnMXFeJzIoJpGQ5HvgFZyA+TbWCm/hk70fR4m8TtYHJ7ijg9moh3twWsKSnxHz46xeu40VwwMbz5aUC8edwmoV5yqsiylMIqzcMhyBvRKWfLeYVuGP19lYEcyISSrkGZy4b5Va4F/YqOJeBuAvMZMITZ6wt6OWIZXwREzyXJkkdsWMZZXdnmfFdcwLB4w71x9J3oU9vC9mNViMEBrgpZgJDNvYd3gs71vJSx8sdK5zTZ5H2j3s1zdiiHqbyXMVyLyE7Repgn9ULJfk8+AN/KlvBMB+Z9/zlCoTs2dY/USYKKt14cgkotiGxJ/ZEWyTNue6VgLPZjHtwU3P6nMibD22YCJ8I9YoR+GW/VwhpqpxdMJDFWP/zqlYHAvyunGDjkcfPDm4ebflfcX5cMrVInwvnDtx1wf4w44LITpif0vACeODfa6TyIh5MPkHz2CzvY5eUj7/izmrPwIrzrfqp4T/k/Rqp6SkpKTkzgvM5HY6tvTPWAAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAZCAYAAACLtIazAAACtklEQVR4Xu2WS8hNURTHl1BEEUVeSTHxyECRAaU885oYKGIgTJQZJYMrGRgoiYlHMpDEkJIMvmJgqpRSCkkhSWGgPP6/1tm+9e3vnnv3vZ+UOr/6d85Za59z9tp77bW3WUNDw/9CS5qRGztAWzQ5d1SMzg1ipjQqNwYuZrokLQx+7rEl/xVpRfB3ZKz0VVqWO9owXjot3ZRuSd+lZ0NamE2s7I9tsEMPpKvSuNAuZ4d0W/ol/ZS2S1OCn/s90tOqzS5pVvDXskh6bmVBTpdemP9gTGVjNl9J51Ij8yCv2WCA+6Spwd8JBuGu+T8mZT5gkO9JB3NHHXTmjnTYyoKko0+sLMit4blXdpr/Y2XuMLeROfNyRztYG0ekC9IcKwsSCHR1eOYd3t0YbCMNkowhkPM2fA23auxtWS49lGabz0ZpkBF+dNZ81FnXCYLcZl4UmGFSdnfwd4PvEgiBEnCCezJpbbDVwkdOVlfoJ0iKxDHppfkaiqQsiaO9wLzTDGoJrD0Gj2+nYnVDOvSnRRcY4VgI+gkyMV96K23OHRnMLp0u7qR5+0/S4uqZQUr3HSG4+5ltJEEyW9fNy/q0zBehHZ2mbdF6Em/M32lVz8xkKngdoSD8kF4HMRN87H31XJfzpNA6aWlmP2q+r6X3DkjHbXgw/GPAfFZLYF/lHfbbuebrvAjyO51WkjZI36orz3Ubdsv8pwxShLWZgiSAAfMCEZfEBPN3LwdbN6jYfBedsqFFqCcY7TXmQXJNo7/JvFPoTGVbJX0x31cTHCY+SPuDjcrNWk2kQkSVjVW4hJZ5H1hOfUGapUCiSGlm9JH02TxFgc5ukT5KJ8yPd/hRnprvzI99BMZWxWyQ7r1CoaH4cMr5pzAbnEo4O3IwaDc7HMnWS3vNB63fVKPQkLZLckdDQ0NDQ8Nf5jfbr433YBzg2wAAAABJRU5ErkJggg==>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAZCAYAAACLtIazAAACyklEQVR4Xu2WS8iNQRjHH6Fcc80ld0m5pViIlYTIrbBQypKNFaXsTkmxUJKNW7KSWJCUhXREEivlUmKhlIUkiqJc/r9m5jvzPt97vvecr7OweH/178w7zzNz5vLMM2NWU1PzPzNemh7VLbOlNdIkaYizJcZIS6NGOFsZ550uSIszO2Xqkv2StCqz96MpvbLg+FC6Kk3MHdrAhLZKtyy0fSu9LngEzkjfpGtRn6WRBY/+7JZuSH+lP9IOK46J8j7pRfTZK83I7AU2W3Dak9WljtdndR52pikddPUTpOPZ92r3nfhpwTYQ7PgdC+MZ52zAQt2VDniDZ60NbpKE9XvppKtn8hezb3aRVfbwH2WT9zAufMsWhDoiZ543eAi55fE3Qac0nprVedixZxZ889BbIO2M5bTb2/qsLWh3TxrtDQ7GwFjOWv/z3mhTX8kU6be0yxtKOGxhsJzFddIs6YE0PNrTbreb5Etpsjc4mAAT8YtO+bkNHG0F2AnOJqFBxjph1SucILMS2gwa/bLWylZNElsn2Zzx4c/5TJmZ5OjzQVfQIaE40xscWyxkylHSEQsTpC07DL2aJOD/xcIVBOxsKg+KDxY6PW3t432J9Ek6mtVxdz210J5k0MtJpjE14jc7OazPWkHZA6Bp1WemIX2U5rt6Qitl5qrE07Tg0wmXLbR5Is2RthfN7eHuoREHmNdKggdB1SSvWPAb6w1WvH64TsruMfrneumUTRb6RVw9A2X+AoTiMWmFq2cA7NKi+J0eDOhUrGM130j343eCK4TzmcKcnXonzU0OsXzbql89noaFMXx39ZXwRz+km9Ih6bqFc7Uw8yGcH0lfpQ1ZPYtAAjhnoS3PO55vQzMfeGzhmtkfRXlawaMzSDQkH145XUOocm54mXCNtEs2ZTAh2tB2o5U/v/BZaa3+8wXsBhINYbvMG2pqampqanrMPw83napMrrpMAAAAAElFTkSuQmCC>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAZCAYAAACLtIazAAAC3klEQVR4Xu2WS8hNURTHl1CeeUbeEcorZUCMJERehYEiBuozMaKUMrglxUBJJl59fQMZMGCgDKQrBmKkPEomSkmSKAbK4/9rn/19+6x77znnfgwMzr/+3bPXWnvdtfZee+1tVqNGjf8Z48VpGbvFbHGNOEkc4nRgqBcI0629bcQlx8vi4kTPN7KovyquSvQtaIovLRg+FK+LE1ODDiDIreJtC3PfiK9yFmZjxB/iYxsI6J7YK45I7Dx2izfF3+IvcYflY+J7v/g8s9krzkj0OWy2YLQnkUXH6xOZB8E3xcNOPkE8lYyx67OBBA9a2PEqYBHuWIhnnNOBkeJd8ZBXeKy1wSVJWb8Vzzg5SV1x423JuFsQF/Gs9goLMipnrld4UHLLs98InDJ5aiLzYMeeWrBlRSPmizuT8d8mSQzEcsFaz3Cjg7wUU8Sf4i6vaIOjFpLkLK4TZ4kPxOGJDUlut9AUzlso2X2JvgwkQCJ+0fl+ZsXVlgM7wdmkNOhYp8XROYvOoLNS2iQLaTLpyvJ9zMkWWAh6ZiIrAvHhm/MZmxXN0feDroBDSrEsiC3iJ3GUhURIkLnscBHYXey6CRL7z+LSbMwixe9B4Z0Fp+esc70vET+KxxMZd9cTC/OLmgE+8X8t+66CGFMjG7OTw/q1JWj3AGhacPhCnJxX9aMhvhfnOTmllXbmHvGEtSaD/6aFXa2CXgtzuG/nWDjnlcDdwyQOcHp38SAoS7LPgt1Yr7CBJONd6v1z3vGfXjVl2GTBL+QeLur8ObC6J8UVTk4A7NKibBwfDPBsJmM1X4v3s3EEV0jaaFZmsojYiOiyaReugoaFGL45eSkor+/iLfGIeMPCuVqY2FDOj8Qv4oZEziLQAC5amMvz7qu1vlU/WPBLYuw+u5HerVVBo6H58MrpGpQSFzbvP64Rf36KQELMYe5Ga//8QobugIX/qVxqDjQaynaZV9SoUaNGjRr/GH8AC9+US8sMcQIAAAAASUVORK5CYII=>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAU0lEQVR4XmNgGAWDGxgD8QYg5kGXIBaMNANAiiTRsDsQ7wRiFSxy4hBtCJALxI/Q8Csg/gPET7DIXYVoww9I8gI2MGoAA4MaEE8AYg50iVEw2AAAbfQXQGw8NPcAAAAASUVORK5CYII=>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAAAJ0lEQVR4XmNgGAWjYFgBRiCWJAHzQLQhAEjgEQk4F6JtFIyCUQADADFYC1D6UkBiAAAAAElFTkSuQmCC>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAZCAYAAADZl7v4AAADS0lEQVR4Xu2Xy6vNURTHl1CEPAshJZEiSSmPkjJgICJ5/AFGRoQY3a6hjJWUDGSADETC4JSBREyIlAF5FEnEhDzWx967u866v+fVpaP9qW/nnLX32b/929/122v/RDKZTCaT6S3m+IBhpGqmapZqtGv724xVzVON8A2R8arFUZNcW08zXXVM9dU3RNaqnqheq35K6HdA/o1hXPOBqiPBEM841QfVC9VnCfNd0NWjB+EpIeO44Y6Em/JcUd1TrTaxDaofqu8mNtwwRxIKo5hnJ8Ys61VfJJiV4Omj/yXVGBPvSaqMeiaDF2a26mWM19FkcUiYNvj5JPZJaNvk4sTeSNgue5oqoy5KiJ9QjYoxatXzGK+DRZvvgxFqzA4J47WhzCieKLblZS5O/0+qpS5uYS5TJSRW+o5sHaSNuRYlHzHb3/crG7MVVUaR7ZOle/BFqvdS3L+I+xL+Y2G8varrLt6EMqOgKEb/R6ppviFCe9IWCbsINQ7TX6lmqM7FGHWabX/i7392rx2fS1Q3VG9jv1OqCRJqfKqbH2WIVBnl4elgshTsFa6tCrL9qWqV6rDqpmpKV4/mVBllIRmOqk5K/cHnkIRxr5kYC3xLQkJZ2CWYv62F7DAYQ/1ObJUw5mMTS2u90cQa08YoJvhOtdI3NACTMOuqDGTkUGhq1DbVNwkHijqSUUdMLK3LchODNTFur49R1G3qdwJDGfOMiVE+LsS21jQ1iht+KOU1pw6y+rRqs29oSROjSAoS6qBvKCEZxWeizCh+E/dGIVtvi4wCfg+bUSwyW4jdrnj5bQoms18jahbbwlCpM4otmezeLmH7I4t5vajaav8LozCpTwZf0N5UFezl/JeTI2PNVd2VcOJjIdtSZ9QdCTUxweJ14mcZPWEUC8fbPoP6ors/xovEy2Ud1KI+GTwucJri1NfGrPTCe1u66wFwH2zNfp5Fi2VhzOMS+vWbODsG67JOBubIJwcGrs9RO8EpjxPiwvib0/IeCWOeT50kJO1l1U5pcd9khL+hpOQ4WeLbkmirY5dUT4jtqEnNS9lZpJTZ6akoUtXT7/vuloEdJol7ZQ4kp42fLejrfyOuT7LYGGP5pzWTyWQymUwmk8lkMn/AL1mL+r1NXhPyAAAAAElFTkSuQmCC>

[image14]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAZCAYAAADZl7v4AAAD3UlEQVR4Xu2YS6hOURTHl1CEPAfkOSBJIopCRAYMvMlzoBQTI0KMpAxvSYrkkYEMSEneBjcGRJGBSAzII4QIA/JYP+ts3/r2d8733Xt9bvdq/+rfvWedffZZe621H98RSSQSiUSi7dNB1Vc1WTU0uhfTSzVC1Tm+0Yp0UY0X8xnf88C/IWJjwuf/ghuq16pnqu+qPapuZS1E+qtOqV6pTqveqjaoOvpG/xiCv1ns3e9UP1WPVNN9I7Hk0aZRdUj1UDXM3W+XkJSFUl6Z78WCsDa7Xp5dr/rTwqr6rFhyW4NRYkVyWKxoAJ/3ivnG7IKeYoXXO7sO/FDtiGztBmbNFdUT1QBnvyY2+JOqTmIJ+aaa6toASaZdLUhqLWrNzDli70JbnX1RZgu+zRJLCn57mGG3pDKB7QIqskF1SdXd2RvFBk8SSSaJ/Kya4NoAAWtKouaqhsfGDHxYJuWFkgcz6qXY0jzP2ekbH0gkFPnEGD6qxsY3HGGvprDC//E+yD18zSs+bL593K6ozybBA3E13xMbLDMGSFK1ROU5HXNbLNge3s0+R6E0Bd7jCwrWi/kQ+j6aXceQKGYaMy6PMFvRAtVj1VPVV9VzseX2eGZ7IdYXyyzgU6PYs/wdo7ostu/T7qCqh+qB2POfVB/kLyHbVO1iZ6uVqDh4RRAkNnZOYtvEZmyfshbNY7WUZn6gWqKwMwOLCOO54GwEmK2AgvLQT1hxAqEYZjtbWJrvO1tIbFgFmg2nqgOqpVI+NeuVKCBJJOuclCqyJUwUO/RclPJk1yNR250tBDUeO3sidj923sHhapCzhaUZvwLsn+z/1XwphOWPKme6xtQzURTDEdX8+EYzoUL3q7pG9nokyh9WihLFNfY4Ucjvt3mJAq6r+ZILs2eL6q6UNn2qdIpY9nl5tUQ1FYLKeo3Ys1gWWsJQMX/93jow+1vkU9EYPG0+UWvENvTw+wToJHTOWpy3ERPwvKDkwVpOf/vEZhXB5ri8TJp3AsJHfPXPEKwQyHCMjw84nPg4JPWL7J42naiw2eUpdMSay1JzVUr7yiSxCt2dXVeDZ3ZI/menvMDnQR/npdLHIB+wTWIFEOC9b1SjnS2GNg1ife10dmbqHdUMKfnIXw4M16X0QxvYNjghjsyumfHrxPo8ERqJFe0ZsQ8Jtcb9m1At8aBRvEyME/tcc1O1UWwjPyKVn5ryWCHVHWKZLfqdFQiVWSQPQf+i2iUWDD55zSxrUUnc30qpjA2zBT+Ijbcfy2kbXyNmKjPJ2+I41wUCME21RDU4utfWwD/85LMXPicSiUQikUgkEonE3/ILhLEY1vhn6zUAAAAASUVORK5CYII=>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAZCAYAAACsGgdbAAACLUlEQVR4Xu2WPWiUQRCGR/wBUTGoKKKNjSAIAQXBLoKIIViICJKArRZiYZFSAhbaKSIWhhSpLGysVJIUR2xEC03QpBIUREkRbERQifo+zK63395dbg+bFN8LD5ednR1mZ3fni1mtWmtbfWJvINcGsUusy+wbrb0/2iluiwcZN8WWxG9YTCTzrGFtixpiwdz5uXgodiTzJPJRfBMz5sFeiB/ieuKXarMYFBfFe/FZXBYD5puOOmQe46e4a76GtRVh/CMuJDbGv8XJMCZJNhF3e96q1egmEiHmWGaPOmzu01EDVpbkG3H0n0dvonLEpPrbszk0ZtXqtoh71h9+owi4KPaE8f8midg0nM7sJD2b2bpqt1gR5xJbTPKYGBL3xRnzh1MqNs3m71m1ICT9Ohl3VLzkHPm4uGXVO7dNTFs18RPil5hKbKuJe/fVPNFLwXbAPEHmehaBXon9+USi+OI5whJRiGfmsflFJMvfLa+5RJ/Mg92x1t4YRXVpV/iVipPCn9ZFYk+CravaNfCGebB35k38hlgWI4nPVmv6lWqf+GC+5riYD7ZVxcuiLcxZtcvHCsUkOVbGj8Wm4MPLp0n3kiSnwsNhDXc/f0RthQNVOpLZCfLFmg2WB/PUml8hXjVNHb/RYCtVLEzD/DSKxN34bl6la+KReCkOJj5s5opYEpPirfln7KpYn/iViljQkzhq+h53jovc6Qg44rPilLX/cpSKE0n/N6hVq1attai/6ihyPXTfYA0AAAAASUVORK5CYII=>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAaCAYAAADrCT9ZAAACuElEQVR4Xu2XTciNQRTHj1CEJCKhZCdKElJKykcWLJCIsiQpJRErJQusRT6SvZ2PhSzEDiULeySKpBRZ+Dq/zsx7zz3PPPe57mXzvs+//s09M/PMzP/MmTNzRVq0aDFacVo519n8Pqac7up6gf5rlLOV40LboNiivNInJ6Vv+sJE5VflCle3UvlN+Vv5Tvkm8GCnq6xTPhebmPKlaxsGi5U7lRfE1nEr2XC38rzYfLTNSt/0hX1SFbxdbKA6rkr9KD8rxycb5yF8ebL/BVgXc26NDWLRdFw5PzaUMFV5R3lEqoKvKTc4G0xQXhITBNiBT8qnIz0MePu9clGoHxS9BANE17WNIHvmonKBVAUfVi50NtihvCudc80kLORh7pCAI6nnDPYC4xARTSgJ5vdNZ+9xv4sgFB+LhQIJJwqOWKJ8kcqME9Jb8IFQ77FLrM9RV8cmnJNqDigJZm4vuBHs1Mb0ux/Bt8UyuUeTYNrrwJGJUTBP+UqqRyQLxhk5abHevgWvVs50dpNgBBAN00L9MIKZD6f76+SU2Hd7XR0o7fBl6VMwQu+HuibBa6U8+DCCaT/rbITjgNI6SoLjGa4FHX9K953KPcuAH5IdszMLw/sRTUmrLnOS7X9J9zxkdDI74TzD1YOSYMKfSG0EnmRHPTeLPTIosX2YTVE+kPJuLVN+kWqSmSN2XXFtlUD7W+m+O7eJibohlrz8LpcEDwwGXy8mmDI+C7OokmDAQomY/B3lSekkxBIYi8fK0mTzzXfpiKKeKMltrIu2M/KXT8iIfAYjvSfz46LOuyzokPKqWPakxHnRcRn5rP5QvlZeFwtj3uEflU+Uz1LfuvXB/4YcXpNjQwAO2a/cJHYM6pCvHv5kkEA5Qnk3eYQQ7tkeFSBRkbBIXGMC+a4dE+Dt/Eh5Lza0aNGiRQvFHy2EtBEXzgbdAAAAAElFTkSuQmCC>

[image17]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAZCAYAAADJ9/UkAAABhElEQVR4Xu2VvytGYRTHj0hESUpkYmZSRAaKIlGyKIvJZDFZ3/IHKMlABpPFYJRBMonBoixGuxSDFL5fx+09z3Hv7bnY3E99hvecczvP71ek5L9SA2t9ELT5gIG5Dbhj3AsqRNpNLskPBhWgGT7BI6kW3cBZW+RohFPwAb7DK7gQVGjNpWj+BC7CrqBCtHkyuk04A5uCimyG4At8g+MuRw7gig9a2LzfByNpgReis9tyOXINe33Q8pvmZE20+a1PgENY54MWNh+A03BbdOmHg4p8OLNk7y3cc38OvsHm8y62BNdFb0IMbMLmPSZWkfjvA7gN97DbJzJgHeuTw8WzcF5NF4MzyDrBaXCGPHDHoss9Ak+DihT40SpcdvFO0WXktYtlUvTa8bxwIJUgmwL3+0z0gak3cS77q+gMYmkVHfCu6JLnXrGECdhhfnPZeEXyXrgsnkUHwNcsCi49D8u+6NN6Bx+/4kXhnhc5qJ/wj2JOdMSjsCHIxtMHx+RnAy8pKfl7PgDpDUDVgcqMhQAAAABJRU5ErkJggg==>

[image18]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAZCAYAAABjNDOYAAACyklEQVR4Xu2WTahNURTHl1CEfAy8RL2Bj8LER56Bz5KimGCgmBkwVyQjmXoGkoGJ3kAZSPTwhMGJoSkTGTySojBhJB///9t7eWuvt8+5954rDPav/t171tpnn7X/e599tkihUCj8W6ZBK3zQMBNaCW2V0NbyFHpjNJim5RB01egytCppEdAapvtEhiPQXnN9Q9IaVI8lPPOKhDH0BAtaA92BxtPUBMzvg95Db6FP0Ctoh2nDImnAdegndE3SQlZDx6DnMX8QWmTyxNawJE1l+QqdNtc7ocPQQwnPOCqhJtUlCXVviu07wgHMhTZKeNjrND3BA2hM0pnmzLMA5mabOIs9G3PvZOpK5HNuuxhrGIg5raHJHE7WGQnPsOYojDHHcXmeScixfr/6a2kyhzF2OGJiB2Lso4RVobAwSlfIqKTm5cxRujVnCLov7cypJOT4m8tnaTKHA2SHJ01sf4zxHt6rqDm7oe+xzQmT79ec+RLu3ybtzOHeyNw9aJbL1dJkDjfHeS52XMJDxqGlJq7mcMmej20+m3w/5rDPU9C5+L+NOayFOe5HXdNkTo4fEr4CnEmLmqNsltAvB8UB9WPOXQkrUulkDj8e+sXiR4Sx7dLDXqP0Yg7f+TGZagzx5rAQbp6cMd7XjzkXJR1YJ3NyK6cV3ZozCL2E5vhExJtDaCKL5UrbJe3MWQstdrH/yhwO8hF0IV7PgLZIel7JmUP0Xacxoy6nNJnDPv3hjv19if+5qpS/bg4/xzxl8hXR0+tC6Ba0TBtJvTncc1gwVaWp3zSZw4EyZsW+uOnz/4LJpn/WHL7He6Bv0Id4bbED87opYQXxILcBegE9kfzxf72EFVS5uGJrWOdyHn6G+fxhSU/i/M8Yc8tNvBU6A16VTDrPmfR5FY/kuTaV5GeOZx4e7y2swd9f1wevGfdtR2riFM9khUKhUCgUCgXwC1i575IQQntXAAAAAElFTkSuQmCC>

[image19]: <data:image/png;base64,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nJ07tzwD2Uf8gOhZ0eqR85Y2016u2d6kDhfGepsJCf2CnqFfWI3uORXLq5pHRTq4tb6E2lccH6GP+VHIS6J9iFYneFO6iGyApWoMRm5v8ZfJWWG7hGf6eLhZrH4tWMl8eXe/oPTIn1UsODvmy6Ic0g4D6ku5S+0lbq5dGZ+OLvcp0zlSptm2LHc3ajt5r69fL69tIM/zpmvyZoWIczNzpFz2kj/vsKWT7Z2TCfml03IQqH/mg2zm6kn63Bha4txo/xaCVTS2QJeg7MMag3MgN/LP8bUX6APa3I9Z2FYeV8XuP8SgfieijZ8HryddTT8+ty17EweZ/0v6K3lINJnX9qWD0pN91EP96vju5+0cPLPUZ3wMsiJ6bQRZvSbWV9Iqm9JFRETkADwzNv9KWo4eVqyf1EeKiIiIACs+nE/dtAosRwey50zjflZZRURE5BjBma579JFyWuB83NJZOxERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE5JvwJwSFffEaUlRIAAAAASUVORK5CYII=>

[image20]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAaCAYAAADovjFxAAADMElEQVR4Xu2XS6hOURTHlzwi70ce5ZWBkoGkFImbUJJX1FUGzJRkSEpKMpARiSIDAykZMJBHyi0TMWBAtzxyjSRJCXnz/9119v32t+93zvnEvVecX/077bXWea299jr7mFVUVFSUMyU1iAHSOKlfYh8oTUpsgG2BNN66nxPg3KnSQmlU4uszJkiHpc+pw/ylnkvvpBvSSem29EnaF8XBEumeeQzHh/XuTlql11KbdFp6JE2P/L0Os/VN+pAdf9S7OwlJwBdEsnZK/aO4+dKbyMZsk4y5XRHOF2mr1apkpNQuTQ4BfcUw85nJS8J9aV7qiJhlPrt3EzvL6IU0Ixsvky6YL7GYcO7oxN6r/G4SVpuf25bYuS72ldl4t3Sm5u6CSnsrzUkdEVQOSYqrLw8mhcoabF7tTdFMEij3VdJx85em3AO8XFEStmVjEpCXhO/mlZLHXvOYkFAYIp2XRmTjieaVtks6aN5vvma+UsqS8FjqkPZLLdJT8/IN67gsCfihKAnEkdxGDDVvymm1UJ3vzZcXlXJMuhr5x0p3onEhRUloRGiWzAz0dBLWmPuPRjZe+qx5owUScc48jipoMb9/0/xqEoZLt6wW39NJ4OXxb45sNF0+wR2RbZr0wDw2iE9/UxQl4YB5944fII0va4zh5YoaI2Wd13xZejwDDS+wyLwK6AEx9Koj0hOrJYKqKSV9qZgwSxelQZmNzRV9IcSzTlmv6eaIuPjhaWqXzbt2TDiX2W0EfiqPCgyE6uO41vweJ6SZUQw2njPvunVQRuzwuGjc9WGDdEUak43DJohYunCAdcuGK2Sd4x5peVeEQ0xrNOZ6r6TZkS2G63CvdvOkAjtV+lGoHr5YbL/bzL8IASb3upVUQijXRgolzAV2SC/NS5k112jHSNx26ZS0MTuyE00f4FBmp3ltki5JS+si6mEWeR6Sx73ZanPvddJH6ab5JPIu18ybI1XLs3aYN88/BrOwXlphvtXNg+RtMY/j09YIftRIFH1mceJLYaZZQlyLjU/808ayCmOSzXLhGOJ+6evwN8NGi6r5b2FWKeeineQ/D2v9mXX/4aqoqKio6Al+AlgHz/VGaLW8AAAAAElFTkSuQmCC>