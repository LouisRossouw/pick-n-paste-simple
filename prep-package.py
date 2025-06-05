import os
import json
import shutil

project_name = "timeinprogress"

dirs_to_remove = ['content-ui', 'devtools',
                  'devtools-panel', 'new-tab', 'options']


this_dir = os.path.dirname(__file__)
output_dir = os.path.join(this_dir, 'output')


def run():
    dist_path = os.path.join(this_dir, 'dist')
    manifest_file = os.path.join(dist_path, 'manifest.json')

    if os.path.exists(dist_path):
        manifest = read_json(manifest_file)

        for dir in dirs_to_remove:
            dir_to_remove = os.path.join(dist_path, dir)

            if os.path.exists(dir_to_remove):
                shutil.rmtree(os.path.join(dist_path, dir))
                print('- Removed:', dir)

    if not os.path.exists(output_dir):
        os.mkdir(output_dir)

    name = f"{project_name}_v{manifest.get('version')}"
    finale_zip_path = os.path.join(output_dir, name)

    os.startfile(output_dir)
    shutil.make_archive(finale_zip_path, 'zip', dist_path)

    clean_directory(dist_path)

    print('Packaged as .zip and ready to be deployed @ https://chrome.google.com/webstore/devconsole/44f3d8dc-7a76-47af-913d-aea579a1509c')


def clean_directory(dist_path):
    for f in os.listdir(dist_path):
        file_path = os.path.join(dist_path, f)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)  # Remove directories
        else:
            os.remove(file_path)  # Remove files


def read_json(json_path):
    """ Reads json file """

    with open(json_path) as f:
        json_file = json.loads(f.read())

    return (json_file)


if __name__ == "__main__":
    print('..Busy packaging chrome extension into a .zip')
    run()
