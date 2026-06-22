# Usamos una imagen de Maven con Java 17 para construir
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Usamos una imagen ligera de Eclipse Temurin (Java 17) para ejecutar
FROM eclipse-temurin:17-jre-alpine
COPY --from=build /target/plataforma-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]