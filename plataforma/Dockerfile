# Usamos una imagen de Maven con Java 21 para construir
FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

# Usamos una imagen ligera de Eclipse Temurin (Java 21) para ejecutar
FROM eclipse-temurin:21-jre-alpine
COPY --from=build /target/plataforma-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]