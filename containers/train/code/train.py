import json
model={
    "result":"1",
}

print("model")
print(model)
output_file='/opt/ml/model/model.json'
print("saving model to {}".format(output_file))

with open(output_file, 'w') as outfile:
    json.dump(model, outfile)

